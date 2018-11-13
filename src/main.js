$('.slidingBlock:first-child').animate({
    right:"+=180"},330, function() {
        $('.textUnderSlidingBlock:nth-child(2)').animate({
    opacity: "toggle"
    },400, nextOne())
    });
    function nextOne(){
    $('.slidingBlock:nth-child(3)').animate({
    right:"+=180"},330, function() {
        $('.textUnderSlidingBlock:nth-child(4)').animate({
    opacity: "toggle"
    },400)
    });}
		/*Place cicles in cicrle*/
		if(window.matchMedia('(min-width: 840px)').matches){
			placeInRound();
		}else{
			$('.circlesBlock').attr('style','');
			var elems = $('.circleBlock');
			elems.each(function(){				
				$(this).attr('style','');
			});
		}
    $(window).resize(function(){
			if(window.matchMedia('(min-width: 840px)').matches){
				placeInRound();
			}else{
				$('.circlesBlock').attr('style','');
				var elems = $('.circleBlock');
				elems.each(function(){				
					$(this).attr('style','');
				});
			}
    });
    function placeInRound(){
      var elems = $('.circleBlock');
      var maxH=0;
      for(var i=0; i<elems.length; i++){
        if(maxH<$(elems[i]).outerHeight()){
          maxH=$(elems[i]).outerHeight();
        }
      }
      var widthC;
      if (window.matchMedia("(min-width: 1366px)").matches) {
        widthC = 1366;
      }else{
        widthC = $(window).width();
      }
      if(widthC<maxH*3){
        maxH=widthC;
      }
      var cx, cy;
      cx = widthC/2;
      cy = maxH*3/2;
      var coords=[];
      for(var j=0; j<360; j+=60){      
        coords.push(calcTraversalPoint(maxH, j, cx, cy));
      }
      for(var i=0; i< elems.length; i++){
        $(elems[i]).css({"left": coords[i].x+"px", "top": coords[i].y+"px"})
      }
      $('.circlesBlock').height(maxH*3);  
    }
    /*end place cirles in circle*/
    /*Ration pic switcher*/
    var textToConvert=['Monetization Tools','Accurate Analytics','Social Networking','Customer Support','Content Management'];
    var globS, globE;
    var size=622;
    var charSpace = 0.67;
    var picturesToText = ['src/images/monTools_v2.svg','src/images/Accurate_Analytics.svg','src/images/Social_Networking.svg','src/images/Customer_Support.svg','src/images/advanced_controls_v2.svg'];
    
    createSvg();
    function createSvg(){
			if(window.matchMedia("(max-width: 640px)").matches){
				size=$(window).width()-20;
			}
      var colorOnHover = $('#insertHere').attr('data-colorHOver');
      var colorInitial = '#01a6fe';
      var svgImage ='<svg usemap="#clickmap" width="'+size+'" height="'+size+'">';  
      var usedCLength=0;  
      var blockSpace = whiteSpaceToAdd(charSpace, textToConvert);
      for(var i=0; i<textToConvert.length; i++){
        if(i!=0){
          usedCLength+=textToConvert[i-1].length+blockSpace;
        }    
        let svgBlocks=init(textToConvert[i],usedCLength,charSpace);    
        svgImage+='<g data-textg="'+picturesToText[i]+'"><path class="pathClick" fill="'+colorInitial+'" d="'+svgBlocks.pathArrow+'" data-angl="'+svgBlocks.middleAngl+'"/><path fill="none" id="textPath'+i+'" d="'+svgBlocks.pathText+'" /><text x="'+svgBlocks.textLength/2+'" y="0" text-anchor="middle" fill="white" ><textPath href="#textPath'+i+'">'+textToConvert[i]+'</textPath></text></g>';
      }
      svgImage+='</svg>';
      $('#insertHere').append(svgImage);
      var toRotateAngl = $('.pathClick').attr('data-angl');  
      toRotateAngl = 90+parseFloat(toRotateAngl);  
      $('#insertHere svg').css("transform","rotate("+toRotateAngl+"deg)");
      jQuery(function($){
        $('path').click(function(){
          clickDone(this);
        });
        $('text').click(function(){
          clickDone(this);
        });
        $('path').hover(function(){
          $(this).css('fill',colorOnHover);
          $('#insertHere').addClass('paused');
        },function(){
          $(this).css('fill',colorInitial);
          $('#insertHere').removeClass('paused');
        });
        $('text').hover(function(){
          var path=$(this).parent().children('.pathClick');      
          path.css('fill',colorOnHover);
          $('#insertHere').addClass('paused');
        },function(){
          var path=$(this).parent().children('.pathClick');      
          path.css('fill',colorInitial);
          $('#insertHere').removeClass('paused');
        });
      });  
    }
    
    function init(text,usedCLength,charSpace){
      var textLineShift = 3; // in degrees
      var charSize = parseFloat($('#insertHere').css("font-size"));
      var textLength = text.length*charSpace*charSize;  
      var middleCircleRadius = (size/2)-charSize;
      var circleLength = 2*middleCircleRadius*Math.PI;  
      var arcAnglStart = 360*(usedCLength*charSpace*charSize)/circleLength;
      var arcAnglEnd = 360*(usedCLength*charSpace*charSize+textLength)/circleLength;  
      var startPoint = {"outerRad": calcTraversalPoint((size/2), arcAnglStart, size), "middelRad": calcTraversalPoint(middleCircleRadius+charSize/4, arcAnglStart+textLineShift, size), "innerRad": calcTraversalPoint((middleCircleRadius-charSize), arcAnglStart, size),"middleRadExact":calcTraversalPoint(middleCircleRadius, arcAnglStart+textLineShift, size)};
      globS=startPoint;
      var endPoint = {"outerRad": calcTraversalPoint((size/2), arcAnglEnd, size), "middelRad": calcTraversalPoint(middleCircleRadius+charSize/4, arcAnglEnd+textLineShift, size), "innerRad": calcTraversalPoint((middleCircleRadius-charSize), arcAnglEnd, size),"middleRadExact":calcTraversalPoint(middleCircleRadius, arcAnglEnd+textLineShift, size)};
      globE=endPoint;
      var path1 = 'M '+startPoint.outerRad.x+' '+startPoint.outerRad.y+' A '+size/2+' '+size/2+' 0 0 0 '+ endPoint.outerRad.x +' '+endPoint.outerRad.y+' L '+endPoint.middleRadExact.x+' '+endPoint.middleRadExact.y+' L '+endPoint.innerRad.x+' '+endPoint.innerRad.y+' A '+((size/2) - (charSize*2))+' '+((size/2) - (charSize*2))+' 0 0 1 '+startPoint.innerRad.x+' '+ startPoint.innerRad.y +' L '+startPoint.middleRadExact.x+' '+startPoint.middleRadExact.y+' Z '+startPoint.outerRad.x+' '+startPoint.outerRad.y;
      var pathText = 'M' + startPoint.middelRad.x +' '+ startPoint.middelRad.y + 'A'+(size/2-charSize)+' '+(size/2-charSize)+' 0 0 0 ' + endPoint.middelRad.x+ ' ' + endPoint.middelRad.y;  
      return {'text': text, 'pathArrow': path1, 'pathText': pathText, 'charSize': charSize,'textLength':textLength,'middleAngl': (arcAnglStart+arcAnglEnd)/2};
    }
    
    function whiteSpaceToAdd(charSpace, textToConvert){  
      var ocuppiedLength =0;
      for (var i=0; i<textToConvert.length; i++){
        ocuppiedLength+=textToConvert[i].length;
      }
      let charSize = parseFloat($('#insertHere').css("font-size"));
      let middleCircleRadius = (size/2)-charSize;
      let circleLength = 2*middleCircleRadius*Math.PI;
      let spaceCount = (circleLength-ocuppiedLength*charSpace*charSize)/textToConvert.length; 
      return spaceCount/charSpace/charSize;
    }
    
    function calcTraversalPoint(rad, angl, size, cy){
      var x, y;
      var a=size/2;
      var xSign=1;    
      if(angl>90&&angl< 270){
        xSign=-1;
      }
      if(typeof cy!="undefined"){
        a=size;
      }
      angl=angl*Math.PI/180;
      x=Math.sqrt((rad*rad)/(1+Math.tan(angl)*Math.tan(angl)));
      y=Math.tan(angl)*x;  
      x=evenize(xSign*x+a);
      if(typeof cy!="undefined"){
        a=cy;
      }
      y=(-1)*(evenize(xSign*y-a));  
      return {"x":x,"y":y};
    }
    
    function evenize(num){
      var rest=num%1;
      if(rest<0.5){
        num=num-rest;
      }else{
        num=(num-rest)+1;
      }
      return num;
    }
    
    function clickDone(elem){
      elem=$(elem);
      var block=elem.closest('g');
      block = block.attr('data-textg');
      $('.imagesContainer img').fadeOut(300, function(){
        $('.imagesContainer img').attr('src',block);
        $('.imagesContainer img').fadeIn(300);
      });
      var anglToRot = parseFloat(elem.parent().find(".pathClick").attr('data-angl'));  
      var delta = $('#insertHere svg').attr("style");
      delta = parseFloat(delta.replace(/([^0-9,.-])/g,""));
      var delta360=0;
      if(delta>360){   
        delta360 = (delta-delta%360);
      }
      var curPos=anglToRot-delta;
      curPos=curPos+90; 
      var curPos360=curPos-(curPos%360);
      curPos=curPos-curPos360;
      var sign=1;
      if(curPos<0){
        sign=-1;
      }
      curPos=Math.abs(curPos);
      if(curPos>180){
        anglToRot=(-1)*(360-curPos);
      } else {
        anglToRot=curPos;
      }
      anglToRot=anglToRot*sign;      
      console.log('curPos='+curPos+'|| anglToRot='+anglToRot+" || delta="+delta);
      $('#insertHere svg').css("transform","rotate("+(anglToRot+delta)+"deg)");  
    }
		
// mobile menue
var count = 0;
    $(document).click(function(e) {
      var target = e.target;
      var x = window.matchMedia("(max-width: 900px)");
      if (x.matches) {
        if (target === $('.mobMenuBtn')[0] || target === $('.mobMenuBtn').children()[0] || target === $($('.mobMenuBtn').children()[0]).children()[0]) {
          if (count === 0) {						
            $('.mainMenu').show();
            count = 1;
          } else {
            $('.mainMenu').hide();
            count = 0;
          }
        } else {
          if (count === 0) {
            return;
          } else {
            $('.mainMenu').hide();
            count = 0;
          }
        }
      }
    });
    $(window).resize(function() {
      var ww = $(window).width();
      if (ww > 900) {
        $('.mainMenu').show();
      } else {
        $('.mainMenu').hide();
        count = 0;
      }
    });

    $(document).ready(function() {
      $("a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          var delta=0;
          if(window.matchMedia('(max-width: 768px)').matches){
            delta=140;
          }else{          
            delta = $(window).height()/2-$(hash).height()/2;
          }
          $('html, body').animate({            
            scrollTop: $(hash).offset().top - delta
          }, 800);
        }
      });
    });

    var backsList = ['images/var2.jpg','images/var3.jpg','images/var1.jpg'];
    var counter =0;
    var inter = setInterval(function(){
      $('.block1').attr('style','background-image: url(src/'+ backsList[counter]+')');

      counter+=1;
      if(counter===3){
        counter=0;
      }
    },3000);