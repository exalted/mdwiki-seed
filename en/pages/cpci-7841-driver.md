# cPCI-7841 driver 

See also [cPCI-7841](cpci-7841.md)

## Driver Issue

the function 
```c
int p7841_ioctl( struct inode *inode,  struct file *file,
    unsigned int ioctl_num,/* The number of the ioctl */
    unsigned long ioctl_param) /* The parameter to it */
```
uses fasync_helper kernel function and is referenced inside the 
**fops** struct:

```c
struct file_operations fops = {
	ioctl: p7841_ioctl,   /*ioctl */
	open: p7841_open,
	release: p7841_release  /* a.k.a. close */
};
```

New kernels do not provide the ioctl field,
which was replaced by two fields:

```c
	long (*unlocked_ioctl) (struct file *, unsigned int, unsigned long);
	long (*compat_ioctl) (struct file *, unsigned int, unsigned long);
```

the previous declaration of the ioctl field was:

```c
int (*ioctl)( struct inode *inode,  struct file *file,
    unsigned int ioctl_num,/* The number of the ioctl */
    unsigned long ioctl_param) /
```

The inode pointer is still accessible via the passed file\* argument:

```c
filp->f_dentry->d_inode
```

struct dentry declaration (dcache.h):

```c
struct dentry {
  //...
	struct inode *d_inode;		/*
  //...
}
```

So updating **p7841_ioctl** arguments and using {unlocked,compat}_ioctl should fix the **fops** struct.

Regarding the **fasync_helper** function, it is declared in **fs.h**:

```c
extern int fasync_helper(int, struct file *, int, struct fasync_struct **);
```

The original p7841 driver uses the function this way:

```c
fasync_helper( (int)inode, file, 0, &(ppci_info->async_queue1) );
```
casting a **struct inode\*** to an **int**.

Informations about the fasync_helper function may be found in the *linux device driver* book. See also [Learning - Driver Development](driver_development_learning.md)

the fasync_helper function is used to maintain a list of process that subscribes to async updates.

whenever the drive want to issue an update, it will call the **adl_kill_fasync** function, that will call the standard **kill_fasync** kernel function. This way, a SIGIO signal is sent to all the subscribed process.

While the first argument should indeed be an integer relative to a file descriptior (**fd**), it seems that, looking inside the kernel code, this integer is not actually for managing the list, and will be visible only from userspace. 

So casting the **struct inode\*** to an **int** should not be a problem. So far, however, it seems a pointless action to do (maybe the driver author wanted a unique id?).

Going back to the p7841_ioctl function, which function will replace it?

[StackOverflow - What is the difference between ioctl(), unlocked_ioctl() and compat_ioctl()?](http://unix.stackexchange.com/questions/4711/what-is-the-difference-between-ioctl-unlocked-ioctl-and-compat-ioctl)

Since we are not interested in 32bit userspace program, we will use **unlocked_ioctl**

Another edit must be done, the POLL_IN costant is not visible. It is defined inside <asm/siginfo.h>, which must be added:

```c
#include <asm/siginfo.h>
```



### Patch

```diff
diff --git a/drvsrc/7841.c b/drvsrc/7841.c
index a566394..bacc06e 100644
--- a/drvsrc/7841.c
+++ b/drvsrc/7841.c
@@ -295,11 +295,11 @@ void RevMsg(PCI_Info* pDecExt, int port, CAN_MSG* temp_param)
        spin_unlock_irqrestore(&pDecExt->rlock[port], flags);
 }
 
-int p7841_ioctl( struct inode *inode,  struct file *file,
+long p7841_ioctl(struct file *file,
     unsigned int ioctl_num,/* The number of the ioctl */
     unsigned long ioctl_param) /* The parameter to it */
 {
-
+  struct inode *inode = file->f_dentry->d_inode;
        PCI_Info* ppci_info = (PCI_Info*)(file->private_data);
        U16 Enable_Flag;
        void* temp_param;
@@ -382,11 +382,13 @@ int p7841_ioctl( struct inode *inode,  struct file *file,
                x = copy_from_user ((void *)&Enable_Flag, (const void*)ioctl_param, sizeof(U16));
                if( Enable_Flag == 0 )
                {
+                       printk( KERN_NOTICE " Calling fasync_helper, SIGNAL1_SET, enable_flag == 0 \n " );
                        fasync_helper( (int)inode, file, 0, &(ppci_info->async_queue1) );
                        break;
                }
                else
                {
+                       printk( KERN_NOTICE " Calling fasync_helper, SIGNAL1_SET, enable_flag != 0 \n " );
                        if( (fasync_helper( (int)inode, file, 1, &(ppci_info->async_queue1) ) ) == -ENOMEM )
                                return -1;
                }
@@ -400,11 +402,13 @@ int p7841_ioctl( struct inode *inode,  struct file *file,
                x = copy_from_user ((void *)&Enable_Flag, (const void*)ioctl_param, sizeof(U16));
                if( Enable_Flag == 0 )
                {
+                       printk( KERN_NOTICE " Calling fasync_helper, SIGNAL2_SET, enable_flag == 0 \n " );
                        fasync_helper( (int)inode, file, 0, &(ppci_info->async_queue2) );
                        break;
                }
                else
                {
+                       printk( KERN_NOTICE " Calling fasync_helper, SIGNAL2_SET, enable_flag != 0 \n " );
                        if( (fasync_helper( (int)inode, file, 1, &(ppci_info->async_queue2) ) ) == -ENOMEM )
                                return -1;
                }
@@ -439,7 +443,7 @@ int p7841_ioctl( struct inode *inode,  struct file *file,
 }
 
 struct file_operations fops = {
-       ioctl: p7841_ioctl,   /*ioctl */
+       unlocked_ioctl: p7841_ioctl,   /*ioctl */
        open: p7841_open,
        release: p7841_release  /* a.k.a. close */
 };
@@ -545,6 +549,7 @@ void clear_fasync_queue( struct fasync_struct ** ppfa )
      struct fasync_struct *pfa, **fp;
 
      for ( fp = ppfa; (pfa = *fp) != NULL; fp = ppfa ){ 
+                       printk( KERN_NOTICE " Calling fasync_helper in clear_fasync_queue \n " );
        fasync_helper( pfa->fa_fd, pfa->fa_file, 0, ppfa ); 
      }
 }
diff --git a/drvsrc/isrdpc.c b/drvsrc/isrdpc.c
index 3e0b5ca..ea61484 100644
--- a/drvsrc/isrdpc.c
+++ b/drvsrc/isrdpc.c
@@ -2,6 +2,7 @@
 #include <linux/modversions.h>
 #endif
 
+#include <asm/siginfo.h>
 #include <asm/io.h>
 #include "7841.h"
 #include <linux/interrupt.h>
```
