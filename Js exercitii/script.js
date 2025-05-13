// 1) Exercitiul asta este pentru o clinica care are nevoie sa faca o categorisire pe pacienti in functie de varsta. Task-uri:

//  - creeaza o variabila care contine varsta pacientului

//  - daca varsta este sub 12 => afiseaza in consola "copil"

//  - daca varsta este intre 12 (inclusiv) si sub 18 => afiseaza in consola "adolescent"

//  - daca varsta este intre 18 (inclusiv) si 65 => afiseaza in consola "adult"

//  - daca varsta este peste 65 (inclusiv) => afiseaza in consola "senior"

let pacientAge = 65;

let pacientIs = "Pacientul este ";

if (pacientAge < 12) {
    console.log(pacientIs + "copil");
} else if (pacientAge >= 12 && pacientAge < 18) {
    console.log(pacientIs + "adolescent");
} else if (pacientAge >= 18 && pacientAge < 65) {
    console.log(pacientIs + "adult");
} else {
    console.log(pacientIs + "senior")
}



// 2) Exercitiul asta este pentru determinarea procentului de reducere aplicat la o cafenea. Task-uri:

//  - creeaza 3 variabile: una pentru costul total al bonului inainte de reducere, una care indica daca clientul este student sau nu ( val booleana ),

//  una care indica daca este weekend ( booleana )

//  - daca clientul este student si totodata este weekend => aplica o reducere de 20% pe costul total si afiseaza in consola "Pretul final dupa aplicarea reducerii este de X lei"

//  - daca clientul este student sau daca este weekend => aplica o reducere de 10% pe costul total si afiseaza in consola "Pretul final dupa aplicarea reducerii este de X lei"

//  - daca nu a fost aplicata nicio reducere => afiseaza in consola "Pret: X lei"


let totalPriceBeforDiscount = 100;
let finalPrice = totalPriceBeforDiscount;
let isStudent = true;

let isWeekend = false;

if (isStudent && isWeekend) {
    finalPrice = totalPriceBeforDiscount * 0.8;
    console.log(`Pretul final dupa aplicarea reducerii este de ${finalPrice.toFixed(2)}`)
} else if (isStudent || isWeekend) {
    finalPrice = totalPriceBeforDiscount * 0.9;
    console.log(`Pretul final dupa aplicarea reducerii este de ${finalPrice.toFixed(2)}`);

} else {
    console.log(`Pret: ${finalPrice}`)
}


// Exercitiul asta este pentru afisarea eligibilitatii (LGBT) unui student la bursa. Task-uri:

// // - creeaza 4 variabile: una care contine media notelor studentului, una care contine nr de absente,

// // una care contine nota minima ca sa iei bursa, una care contine numarul de absente MAXIM admis ca sa iei bursa

// // - daca studentul are media necesara si se incadreaza in nr maxim admis de absente, sa se afiseze in consola "felicitari, esti eligibil pentru bursa"

// // - daca studentul nu se incadreaza cu media, dar cu absentele sta bine, atunci sa se afiseze un mesaj in consola gen "ai numarul de absente admis, dar nu te incadrezi cu media ca sa primesti bursa"

// // - la fel ca mai sus, sa se trateze cazul invers ( medie buna, absente nu )

// // - daca studentul nu indeplineste nicio conditie, sa se afiseze in consola un mesaj sugestiv

// // ( tip: folositi else if )


// Conditii:

let minGradeToPass = 5;
let maxAbsAllowedForScholarship = 10;

// Rezultate

let averageGrade = 4;

let totalAbs = 15;




if (averageGrade > minGradeToPass && totalAbs < maxAbsAllowedForScholarship) {
    console.log(`Felicitari, esti eligibil pentru bursa`)

} else if (averageGrade < minGradeToPass && totalAbs < maxAbsAllowedForScholarship) {
    console.log(`Ai numarul de absente admis, dar nu te incadrezi cu media sa iei bursa`)
} else if (averageGrade > minGradeToPass && totalAbs > maxAbsAllowedForScholarship) {
    console.log(`Ai media sa iei bursa, dar nu te incadrezi cu absentele`)

} else {
    console.log(`Pacat de tine, esti prea slab pentru bursa`)
}



// Ex 4 
sum = 0;

for (let i = 1; i < 11; i++) {
    sum += i;
    console.log(sum)
}

// Repetitie   i       sum

//     0       n/a     0
//     1       1       1
//     2       2       3
//     3       3       6
//     4       4       10
//     5       5       15
//     6       6       21
//     7       7       28
//     8       8       36
//     9       9       45
//     10      10      55


// Ex 5
prod = 1;

for (let i = 1; i <= 10; i++) {
    prod *= i;
    console.log(prod)
}


// Repetitie   i       prod

//     0       n/a     1
//     1       1       1
//     2       2       2
//     3       3       6
//     4       4       24
//     5       5       120
//     6       6       720
//     7       7       5040
//     8       8       40320
//     9       9       362880
//     10      10      3628800


// Ex 6 


counter = 0;

for (let i = 1; i < 21; i++) {
    if (i % 3 === 0) {
        counter++
        console.log(i)
        console.log(counter)
    }
}


// Repetitie   i       counter

//     0       n/a     0
//     1       1       0
//     2       2       0
//     3       3       1
//     4       4       1
//     5       5       1
//     6       6       2
//     7       7       2
//     8       8       2
//     9       9       3
//     10      10      3
//     11      11      3
//     12      12      4
//     13      13      4
//     14      14      4
//     15      15      5
//     16      16      5
//     17      17      5
//     18      18      6
//     19      19      6
//     20      20      6


// 7) Sa se creeze o variabila care contine un array cu numere - reprezentand varstele unui grup, iar o alta variabila

// cu numele "children" si valoarea 0. Folosind un for loop, sa se treaca prin fiecare element din array si sa se numere

// cati copii sunt ( practic cate varste sunt mai mici decat 12 ). La final, sa se afiseze in consola "No. of children: X".

// P.S. - daca nu e clar, numaratoarea se face in variabila children





// 8) Tot in codul solutiei de mai sus, includeti extra o numaratoare si pentru adolescenti - interval 12 (inclusiv) - 18.

// La final, sub console.log-ul de la children, sa se afiseze "No. of teenagers: Y".

// O numaratoare pentru adulti - interval 18 (inclusiv) - 65. La final sa se afiseze in consola "No. of adults: Z"

// O numaratoare pentru seniori - peste 65 (inclusiv). La final sa se afiseze in consola "No. of seniors: "





// 9) Tot in codul solutiei de mai sus, includeti calcularea sumei totale a varstelor. Ex: daca ai array-ul [5, 20, 8] => se va afisa "Sum of ages: 33".



// 10) Tot in codul solutiei de mai sus, includeti un console.log la final care sa afiseze media varstelor. Ex: daca ai array-ul [5, 20, 8] => se va afisa "Average: 11".

// let numbers = [12, 1, 10, 4, 23, 55, 21, 23, 43]

// let children = 0;
// let teenagers = 0;
// let adults = 0;
// let seniors = 0;

// for (i = 0; i < numbers.length; i++) {

//     if (numbers[i] < 12) {
//         children++

//     } else if (numbers[i] >= 12 && numbers[i] < 18) {
//         teenagers++
//     } else if (numbers[i] >= 18 && numbers[i] < 65) {
//         adults++
//     } else {
//         seniors++
//     }

// }

// console.log(`No. of children: ${children}`)
// console.log(`No. of teenagers: ${teenagers}`)
// console.log(`No. of adults: ${adults}`)
// console.log(`No. of seniors: ${seniors}`)

// let sumOfNumbers = 0;

// for (i = 0; i < numbers.length; i++) {
//     sumOfNumbers += numbers[i];
// }
// console.log(sumOfNumbers)


// let numbersAverage = sumOfNumbers / numbers.length;


// console.log(numbersAverage.toFixed(2))


// function wordSearch(query, seq) {
//     let newSeq = [];
//     for (let i = 0; i < seq.length; i++) {
//         if (seq[i].toUpperCase().includes(query.toUpperCase())) {
//             newSeq.push(seq[i]);
//         }
//     }

//     if (newSeq.length === 0) {
//         return newSeq = ['Empty'];
//     }

//     return newSeq;
// }

// // Example calls
// console.log(wordSearch("ab", ["za", "aB", "Abc", "zAB", "zbc"]));   // ["aB", "Abc", "zAB"]
// console.log(wordSearch("abcd", ["za", "aB", "Abc", "zAB", "zbc"])); // "Empty"


const isOpposite = (s1, s2) => {


    // const arrayS2 = [];
    let s3 = '';

    if (s1 === '' && s2 === '') {
        return false
    }


    for (let i = 0; i < s1.length; i++) {

        if (s1[i] === s1[i].toUpperCase()) {


            // arrayS2.push(arrayS1[i].toLowerCase())
            s3 += s1[i].toLowerCase()
        } else {

            // arrayS2.push(arrayS1[i].toUpperCase())
            s3 += s1[i].toUpperCase()
        }


    }


    if (s2 === s3) {
        return true
    }
    return false;

}


console.log(isOpposite("ab", "AB"))