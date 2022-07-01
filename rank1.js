const { reduce,values } = require( '@laufire/utils/collection' );


const data = {
    markSheets:[
        {
            student: 'Sriram',
            rollNo: 11,
        },
        {
            student: 'Ram',
            rollNo: 16,            
        },
        {
            student: 'sri',
            rollNo: 18,
        },
        {
            student: 'mani',
            rollNo: 20,
        },
    ] 
};
const studentMarks = {
    '11':{
        tamil: 80,
        english: 90,
        science: 86,
        maths: 97,
        social: 76
    },
    '16':{
        tamil: 60,
        english: 97,
        science: 100,
        maths: 34,
        social: 100
    },
    '18':{
        tamil: 60,
        english: 90,
        science: 66,
        maths: 93,
        social: 46,
    },
    '20':{
        tamil: 40,
        english: 70,
        science: 86,
        maths: 73,
        social: 86,
    },
}
const getStudentDetails = (markSheet) => {
    const minMark = 35;
    const  name =markSheet.student;
    var rollNo =markSheet.rollNo;
    var marks = (studentMarks[rollNo]);
    var total =reduce(marks,(a,b)=>a+b,0);
    var result =  Math.min(...values(marks))> minMark ? "Pass" : "Fail";
    
    return {
        name,
        rollNo,
        ...marks,
        result,
        total,
    }
};
var counter = (a,b)=>
     b.result === "Pass" 
    ? {pass:a.pass+1}
    : {fail:a.fail+1};

var getCount = () => {
    var count = data.markSheets.map(getStudentDetails);
    var dict = reduce(count,(a,b)=>({...a,...counter(a,b)}),{pass:0, fail:0});
    return dict;
}
var getRank = () => {
    var count =  data.markSheets.map(getStudentDetails);
    var sortedArray = count.sort((a,b) => b.total - a.total);
    var rank = 0;
   var updatedMarkSheet =  sortedArray.map(markSheet => {
    (markSheet.result === "Pass") ?   markSheet.rank = ++rank : markSheet.rank = "-";
    return markSheet;
   });
    return updatedMarkSheet;
};

const getStudentData = () => {
    const StudentDataList = getRank();
    const Count = getCount();
    return [
        ...StudentDataList,
        Count,
    ]
};
console.table(getStudentData());
