#!/bin/sh

rm vowel/concat.csv #vowel/sorted.csv

cat vowel/vowels/* > vowel/concat.csv

#sort vowel/concat.csv -n -t , -k 14 -o vowel/sorted2.csv

