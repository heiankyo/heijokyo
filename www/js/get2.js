function getset2(){

			//animate();
			positions2 = ctrack.getCurrentPosition();

			//mathfuncja(positions2);
			
			//return positions2;
			
			mathfuncja(positions1);
            mathfuncja(positions2);
			

			var horiz11=positions1[50][0]-positions1[44][0];
			var verti11=positions1[57][1]-positions1[60][1];
			var verti12=positions1[58][1]-positions1[59][1];
			var verti13=positions1[56][1]-positions1[61][1];


			var horiz21=positions2[50][0]-positions2[44][0];
			var verti21=positions2[57][1]-positions2[60][1];
			var verti22=positions2[58][1]-positions2[59][1];
			var verti23=positions2[56][1]-positions2[61][1];

			var horiz1=horiz21-horiz11;
			var verti1=verti21-verti11;
			var verti2=verti22-verti12;
			var verti3=verti23-verti13;

		if(verti1>5){
			katakana +="ア";
			//console.log("あ");
			}else if(horiz1<-1 && verti2<-1){
			katakana +="ウ";
			//console.log("う");
			}else if(horiz1<0 && verti1>-1 && verti1<1){
			katakana +="オ";
			//console.log("お");
			}else if(horiz1>3){
			katakana +="イ";
			//console.log("い");
			//}else if(horiz1>-0.5&&horiz1<0.5&&verti1<-2){
			//katakana +="ン";
			}else if(-4<=horiz1&&horiz1<=4&&-4<=verti1&&verti1<=4&&-4<=verti2&&verti2<=4){
			katakana +="エ";
			}else{
			katakana +="オ";
			//console.log("え");
			
}
show_message(katakana);
console.log(katakana);

}
