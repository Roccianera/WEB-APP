



let $conent=$("main .container");





let main = function () {


    let $buttons= $("header .right button");


    $buttons.toArray().forEach( button => {

     


        $(button).on("click", () => {
            
            /*
            TODO mettere codice che fa cambiare stile al bottone una volta cliccato 
            */
            $(" main .container").empty();

            if($(button).hasClass("button_inserisci")){
                InsertArtist();
            } else{
                ViewArtist()
            }

        })


    });

    



    $(".button_visualizza").trigger("click");
    

}




$( ()=> main());   // Carico il main di app.js 




//Funzioni per la parte dell 'Inserimento 

function InsertArtist() {
    
    
    let container ="main .container";

    let btn = $("<div>").addClass("btn");
    let btn_button = $("<button>").addClass("btn_button").text("Invia");
    let div_genere=addAttributeInsert("genere","genre").hide();
    let div_vocale=addAttributeInsert("vocale","vocal_registrer").hide();
    let div_strumenti=addAttributeInsert("strumenti","struments").hide();


    
    let $input_specilistic=$("<input>");
    
    let $div_specialistic=$("<div>")
    .addClass("insert_attribute")
    .append($("<h1>").text("specialistic"))
    .append($input_specilistic.attr('id',"specialist"));
    
    
    
    
    $input_specilistic.on("input",()=>{
        
        
        div_genere.fadeOut();
        div_vocale.fadeOut();
        div_strumenti.fadeOut();
        
        
        
        if(($input_specilistic.val()).toLowerCase()=="cantante"){
            
            div_genere.fadeIn();
            div_vocale.fadeIn();
        }else if(($input_specilistic.val()).toLocaleLowerCase()=="strumentista"){
            div_strumenti.fadeIn();
        }
    });
    
    
    
    btn_button.on("click",()=>{


        let $inputs=$(".insert_attribute input").toArray()

        let forwardInsert=true;

/*
        for (let index = 0; index < $inputs.length; index++) {
        
            if($($inputs[index]).val()==""){
                window.alert("Missing argument");
                forwardInsert=false;
                break;
            }
            
        }
        */



        if(forwardInsert){

            //idea utlizzare id per questo;

           let newArtist = {

            firstName:$("#firstName").val(),
            lastName: $("#lastName").val(),
            specialist:$("#specialist").val() ,
            email: $("#email").val(),
            password:$("#password").val(),
            chachet:$("#cachet").val() ,
            phone: $("#phone").val(),
            genre:$("#genre").val() ,
            vocal_registrer:$("#vocal_registrer").val() ,
            img_src:$("#img_src").val(),
            strumensts:($("#struments").val()).split(" "), 

           }

           $inputs.forEach(input=> $(input).val(""));


           $.post('/InsertArtist',newArtist)
                .then((res) => console.log("SaulGoodman"));
        }











    });
    
    
    
    
    
    
    
    $(container).append(addAttributeInsert("Nome","firstName"))
    .append(addAttributeInsert("Cognome","lastName"))
    .append(addAttributeInsert("numero","phone"))
    .append(addAttributeInsert("email","email"))
    .append(addAttributeInsert("password","password"))
    .append(addAttributeInsert("chachet","cachet"))
    .append($div_specialistic)
    .append(div_genere)
    .append(div_vocale)
    .append(div_strumenti)
    .append(addAttributeInsert("foto","img_src"));
    
    $(container).append(btn.append(btn_button));

    
}



function addAttributeInsert(text,idInput){

    let $insert_div=$("<div>").addClass("insert_attribute")
                .append($("<h1>").text(text))
                .append($("<input>").attr('id',idInput));
 
    return $insert_div;
}












//Funzioni per la parte della Vista

function ViewArtist(){


    

    $.getJSON('/artists')
        .then(artists => {

            console.log(artists);


            artists.forEach(artist => {
                addArtistView(artist);
                
            })


        })

        //TODO catch 



}



function DeleteArtist(artist){

    /*funzione per eliminare artista*/

    console.log(artist)

    $.post('/RemoveArtist',artist)
        .then(()=> console.log("Saul goodman remove"));
        



}



function addArtistView(artist){




    let $div_artist= $("<div>").addClass("artist")


    let $h1_name = $("<h1>").addClass("name").text(artist.firstName+" " + artist.lastName +" the " +artist.specialist);

    let $img = $("<img>").attr("src","../images/guitar.png");



    let $first_button =$("<button>").addClass("view").text(">");
    let $second_button =$("<button>").addClass("remove").text("x");
    let $div_more= $("<div>").addClass("more");



    $div_more.append(AddMoreInformationAttribute("email",artist.email)).hide()
            
                .append(AddMoreInformationAttribute("cachet",artist.chachet))
                .append(AddMoreInformationAttribute("phone",artist.phone));

    if(artist.specialist=="cantante"){
        $div_more.append(AddMoreInformationAttribute("genre",artist.genre));
        if(artist.genre=="male")
            $div_more.append(AddMoreInformationAttribute("vocal",artist.vocal_registrer));
    } else if(artist.specialist=="strumentista"){
        $div_more.append(AddMoreInformationAttribute("struments",artist.strumensts));
    }




 

    $("main .container").append($div_more);


    $first_button.on("click", () =>{

            if($first_button.hasClass("view")){

                $first_button.text("<");
                $first_button.removeClass("view");
                $first_button.addClass("less");
                $div_more.fadeIn();

            } else {

                $first_button.text(">");
                $first_button.removeClass("less");
                $first_button.addClass("view");
                $div_more.fadeOut();

            }



    })



    $second_button.on("click",() =>{

        DeleteArtist(artist);
        $div_artist.fadeOut();
        $div_more.fadeOut();

    });










    $div_artist.append($img)
                .append($h1_name)
                .append($first_button)
                .append($second_button)
                .hide();

    $("main .container").append($div_artist).append($div_more);
    $div_artist.fadeIn();

}

/* 
                <div class="more">
                    <div class="attribute">
                        <h1>email:</h1>
                        <h2>hamza34@outlook</h2>
                        <button> M</button>
                    </div>
                    <button class="save"> Save change</button>

                </div>
                */
/*
function AddMoreInformation(artist){


    let $div_more= $("<div>").addClass("more");

    $div_more.append(AddMoreInformationAttribute("email",artist.email));
                /*
                .append(AddMoreInformationAttribute())
                .append(AddMoreInformationAttribute())
                .append(AddMoreInformationAttribute())
                .append(AddMoreInformationAttribute())
                .append(AddMoreInformationAttribute())
                .append(AddMoreInformationAttribute())

            
    $("main .container").append($div_more);


}
*/


function AddMoreInformationAttribute(attr,value){

    let $div_attribute=$("<div>").addClass("attribute");
    let $attr=$("<h1>").text(attr);
    let $value=$("<h2>").text(value);
   // let $button =$("<button>").text(">");
    
    $div_attribute.append($attr)
                   .append($value);
    //               .append($button);
    return $div_attribute;

}





