function sq( x ) {
    return( x * x );
}
function feet_to_inches( feet ) {
    return( feet * 12 );
}
function kg_to_lbs( kg ) {
    return( kg * 2.20462262 );
}
function lbs_to_kg( lbs ) {
    return( lbs / 2.20462262 );
}
function feet_and_inches_to_meters( feet, inches ) {
    return( ( ( parseFloat( feet_to_inches( $("#height_imperials_feet").val(  ) ) ) + parseFloat( $("#height_imperials_inches").val(  ) ) ) * 2.54 ) / 100 );
}
function meters_to_feet( meters ) {
    return( meters * 3.2808399 );
}
function meters_to_inches( meters ) {
    return( ( meters * 100 ) / 2.54 );
}
function body_mass_index( units, mass, height ) {
    if ( units == "SI" ) {
        return( mass / sq( height ) );
    } else {
        return( ( mass * 703 ) / sq( height ) );
    }
}
function body_fat_percentage( bmi, age, sex /* male: 1, female: 0 */ ) {
    return( ( bmi * 1.2 ) + ( 0.23 * age ) - ( 10.8 * sex ) - 5.4 );
}

function calculate(  ) {
    var units = $("input:radio[name=units]:checked").val(  );
    var mass = $("#mass").val(  );
    var age = $("#age").val(  );
    var height = 0;
    var sex = $("input:radio[name=sex]:checked").val(  );
    
    if ( units == "SI" ) {
        height = $("#height_metrics").val(  );
    } else {
        height = parseFloat( feet_to_inches( $("#height_imperials_feet").val(  ) ) ) + parseFloat( $("#height_imperials_inches").val(  ) );
    }

    var bmi = body_mass_index( units, mass, height );
    var advice = "";
    $("#bmi").html( "Your BMI is " + bmi );
    if ( bmi < 16 ) {
        advice = "You're Severely underweight";
    } else if ( bmi < 18.5 ) {
        advice = "You're Underweight";
    } else if ( bmi < 25 ) {
        advice = "You're Normal";
    } else if ( bmi < 30 ) {
        advice = "You're Overweight";
    } else if ( bmi < 35 ) {
        advice = "You're Obese (class I)";
    } else if ( bmi < 40 ) {
        advice = "You're Obese (class II)";
    } else {
        advice = "You're Obese (class III)";
    }
    $("#bmiadvice").html( advice );

    var bfp = body_fat_percentage( bmi, age, sex );
    $("#bfp").html( "Your BFP is " + bfp );
    if ( sex == 0 ) {
        if ( bfp < 10 ) {
            advice = "Are you real⸘";
        } else if ( bfp < 14 ) {
            advice = "You're down to essential fat";
        } else if ( bfp < 20 ) {
            advice = "You're an athlete";
        } else if ( bfp < 24 ) {
            advice = "You're fit";
        } else if ( bfp < 31 ) {
            advice = "You're average";
        } else {
            advice = "You're obese";
        }
    } else {
        if ( bfp < 2 ) {
            advice = "Are you real⸘";
        } else if ( bfp < 6 ) {
            advice = "You're down to essential fat";
        } else if ( bfp < 14 ) {
            advice = "You're an athlete";
        } else if ( bfp < 18 ) {
            advice = "You're fit";
        } else if ( bfp < 25 ) {
            advice = "You're average";
        } else {
            advice = "You're obese";
        }
    }
    $("#bfpadvice").html( advice );
}
function metrics(  ) {
    $("#mass_units").html( " kg" );
    $("label[for='height_metrics']").show(  );
    $("label[for='height_imperials_feet']").hide(  );
    $("label[for='height_imperials_inches']").hide(  );

    if ( $("#mass").val(  ) != null ) {
        $("#mass").val( lbs_to_kg( $("#mass").val(  ) ) );
    }
    if ( $("#height_imperials_feet").val(  ) != null && $("#height_imperials_inches").val(  ) != null ) {
        $("#height_metrics").val( feet_and_inches_to_meters( $("#height_imperials_feet").val(  ), $("#height_imperials_inches").val(  ) ) );
    }
}
function imperials (  ) {
    $("#mass_units").html( " lbs" );
    $("label[for='height_metrics']").hide(  );
    $("label[for='height_imperials_feet']").show(  );
    $("label[for='height_imperials_inches']").show(  );

    if ( $("#mass").val(  ) != null ) {
        $("#mass").val( kg_to_lbs( $("#mass").val(  ) ) );
    }
    if ( $("#height_metrics").val(  ) != null ) {
        $("#height_imperials_feet").val( parseInt( meters_to_feet( $("#height_metrics").val(  ) ) ) );
        $("#height_imperials_inches").val( meters_to_inches( $("#height_metrics").val(  ) ) - ( $("#height_imperials_feet").val(  ) * 12 ) );
    }
}
function change_units(  ) {
    var units = $("input:radio[name=units]:checked").val(  );
    if ( units == "SI" ) {
        metrics(  );
    } else {
        imperials(  );
    }
}
