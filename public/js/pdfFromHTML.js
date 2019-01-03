// function makePDF() {

//     var quotes = document.getElementById('teamListTable');
    
//     html2canvas(quotes).then((canvas) => {
//          //! MAKE YOUR PDF
//          var pdf = new jsPDF("landscape");

//          for (var i = 0; i <= quotes.clientHeight/980; i++) {
//              //! This is all just html2canvas stuff
//              var srcImg  = canvas;
//              var sX      = 0;
//              var sY      = 980*i; // start 980 pixels down for every new page
//              var sWidth  = 900;
//              var sHeight = 980;
//              var dX      = 0;
//              var dY      = 0;
//              var dWidth  = 900;
//              var dHeight = 980;

//              window.onePageCanvas = document.createElement("canvas");
//              onePageCanvas.setAttribute('width', 900);
//              onePageCanvas.setAttribute('height', 980);
//              var ctx = onePageCanvas.getContext('2d');
//              // details on this usage of this function: 
//              // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
//              ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

//              // document.body.appendChild(canvas);
//              var canvasDataURL = onePageCanvas.toDataURL("image/jpeg", 1.0);

//              var width         = onePageCanvas.width;
//              var height        = onePageCanvas.clientHeight;

//              //! If we're on anything other than the first page,
//              // add another page
//              if (i > 0) {
//                  pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
//              }
//              //! now we declare that we're working on that page
//              pdf.setPage(i+1);
//              pdf.addImage(canvasDataURL, 'jpeg', 10, 10, 180, 150);

//          }
//          //! after the for loop is finished running, we save the pdf.
//          pdf.save('Test.pdf');
//      }
//    );
//  }

function HTMLtoPDF(){

    // var pdf = new jsPDF('portrait', 'pt', 'a4');
    // pdf.addHTML($('#HTMLtoPDF')[0], function () {
    //     pdf.save('Test.pdf');
    // });

    // var w = document.getElementById("HTMLtoPDF").offsetWidth;
    // var h = document.getElementById("HTMLtoPDF").offsetHeight;
    // var doc = new jsPDF('portrait', 'pt', [w, h], 'a4');
    // doc.addHTML($('#HTMLtoPDF'), 0, 0, null, function(){
    //     doc.save('sample-file.pdf');
    // });
    // return;

    var pdf = new jsPDF('portrait', 'pt', 'a4');

    // HEADER
    pdf.setFontSize(20);
    pdf.setTextColor(40);
    pdf.setFontStyle('normal');
    // if (base64Img) {
    //     pdf.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
    // }

    source = $('#HTMLtoPDF')[0];
    specialElementHandlers = {
        '#bypassme': function(element, renderer){
            return true
        }
    }
    //pdf.autoTable(header);
    margins = {
        top: 50,
        left: 60,
        width: 545
      };
    pdf.fromHTML(
          source // HTML string or DOM elem ref.
          , margins.left // x coord
          , margins.top // y coord
          , {
              'width': margins.width // max width of content on PDF
              , 'elementHandlers': specialElementHandlers
          },
          function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html
            pdf.save('delivery_team_report.pdf');
          }
      )	

    }