find ./ -name "*1.txt" -o -name "*2.txt" -type f |
while read file
do
  if ! file -bi $file | grep -q 'utf-8'
  then 
    echo " $file"
    mv "$file" "$file".icv
    iconv -f cp1251 -t UTF-8 "$file".icv > "$file"
    rm -f "$file".icv
  fi
done