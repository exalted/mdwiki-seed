#
Daily commuting is not easy for Linux IT folks. Sometimes, people to find ways to work on the go so that they can make commuting time less painfull. It is hard to picture how it is to work on the go. You may think about hopping to a coffee shop such as starbuck or dunkin donuts to establish your working station. This wouldn't work all the time, you may not find a proper table and chair or power outlet. Theses challlenges are surely problems for us. The upside is that we, IT, diginat merchanary can totally adaptable. As you read this article, I hope I can help you can brainstorm the whole process. 


# Requirement #
First of all, let thinks about the items that you may carry with you.

List1:

1. laptop
2. powerbank
3. laptop charger
4. smart watch 
5. Bagpack
6. Headset

Secondly, think about your commuting experience such as things that annoy you, things that discomfort you the most. Then, think about possivity that can have in your life your side project, events that you prepare for your family, your vacation. Also, tasks related to your jobs. 

Describe funtionalities of your items:

1. to storage all of your items - backpack/messenger-bag
2. to perform online meeting - bluetooth head set
3. to have internet connection -  xfinity public wifi/phone hot spot / usb tethering  /bluetooth internet sharing
4. to journal - phones with stylus/small journal
5. to test your codes and build - Virtual machine (two or more)
6.  



# Lap top build # 
The most noticeable thing I encounter while working on the go is the fact that we dont use mouses often. Therefore, it is essential for any laptops to have a **good** trackpad. There are multiple vendors who cares about IT need such as Lenovo and Dell. You may disagree with me, but these are the two I believe that they produce comporate envirement and mobility of their laptops. 

- Choose the virtualization technology to work with
	- most common one is virtualbox
	- docker engine
	- kvm 
	- vmware
	
- Back-up resolution
	- usb block device (hard drive, usb) - The most reliabe method.
	- cloud backup (tend to be expensive) - Based on my experience. this method is not reliable as it seems
	- home backup 
		- rsync utitlities (need private and public key)
		- nexcloud (docker deploy) - require dockerfile writing, but It has encryption.
		- samba and nfs.
	
 
