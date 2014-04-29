#!/usr/bin/env python
# coding: utf-8
#
# created: 2014-04-29

import sys
import csv
import os

reload(sys)
sys.setdefaultencoding('utf-8')

split = u','

def append_vowel_all(inputdirectory, outputdirectory):
    inputfiles = os.listdir(inputdirectory)
    for inputfile in inputfiles:
        if inputfile.endswith('.csv'):
            print inputfile
            append_vowel(inputfile, outputdirectory + os.sep + inputfile)

def append_vowel(inputfilename, outputfilename):
    inputfile = open(inputfilename, 'r')
    outputfile = open(outputfilename, "w")
    reader = csv.reader(inputfile)
    writer = csv.writer(outputfile)
    
    for row in reader:
        dec = []
        for item in row:
            dec.append(item.decode('utf-8'))
        dec.extend([get_vowel(dec[11]), get_vowel(dec[12])])
        writer.writerow(dec)

    inputfile.close()
    outputfile.close()

def get_vowel(text):
    result = u''
    for ch in list(text):
        if   ch in u"アカサタナハマヤラワァヵャヮガザダバパヴ": result += u"ア"
        elif ch in u"イキシチニヒミリィギジヂビピ":           result += u"イ"
        elif ch in u"ウクスツヌフムユルンゥッュグズヅブプ":           result += u"ウ"
        elif ch in u"エケセテネヘメレェゲゼデベペ":           result += u"エ"
        elif ch in u"オコソトノホモヨロヲォョゴゾドボポ":           result += u"オ"
        else: result += u""
    return result

if __name__ == '__main__':
    outputdir = u"../vowel/vowels"
    if os.path.exists(outputdir) == False:
        os.mkdir(outputdir)
    append_vowel_all(u".", outputdir)

