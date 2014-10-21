#!/bin/bash

usage () {
  echo "usage:"
  echo $0 old_page_name new_page_name
  echo 
  echo "Both arguments must not have the '.md' suffix"
  exit
}

pages_dir="$(find .. -type d -name 'pages' )" 

page_exist () {
  {
    echo "searching $1 in dir: $pages_dir"

    grep -R $1 $pages_dir
  } &> /dev/null
  return $?
}

ends_with_md () {
  if [[ "hello.md" =~ "\.md$" ]]; then 
    return 1
  else
    return 0
  fi
}

bad_arg() {
  echo "argument must be without '.md' extension ! "
  exit -1
}

if [[ $#  != 2 ]]; then
  usage
fi

if ! ends_with_md $1 ; then
  bad_arg
fi

if ! ends_with_md $2 ; then
  bad_arg
fi

old_page="${1}.md"
new_page="${2}.md"

if page_exist $old_page ; then
  echo "replacing links..."
  files=$(find .. -name "*.md" -exec sed -i "s/${1}\.md/${2}\.md/g" {} \; )
  echo "replacing file"
  page_file=$(find .. -name "$old_page")
  page_file_dir=$(dirname $page_file)
  mv $page_file $page_file_dir/$new_page
  echo "page moved"
else 
  echo "page $1 not found!"
fi
