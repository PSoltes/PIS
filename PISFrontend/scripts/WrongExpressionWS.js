import AsyncStorage from '@react-native-community/async-storage';

export default function checkWrongExpression(text){
    wrong_expressions = ["kokot", "piča", "chuj", "jebo", "jebat", "jebať", "piče" ];
    let wrong_expressions_count = 0;

    text = text.toUpperCase();

    wrong_expressions.forEach(function(expression){
        expression = expression.toUpperCase();
        if (text.includes(expression) >= 0){
            wrong_expressions_count += 1;
        }
    });

    if(wrong_expressions_count != 0){
        return 1;
    }
    else{
        return 0;
    }

}
