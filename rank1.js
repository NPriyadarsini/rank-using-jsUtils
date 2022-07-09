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
const minMark = 35;
const getStudentDetails = (markSheet) => ({   
        ...markSheet,
        ...studentMarks[markSheet.rollNo],
        result:getResult(studentMarks[markSheet.rollNo]),
        total:getTotal(studentMarks[markSheet.rollNo]),
});
const getTotal = (marks) => reduce(marks,(a,b)=>a+b,0);
const getResult = (marks)=> Math.min(...values(marks))> minMark ? "Pass" : "Fail";
const counter = (a,b)=>
     b.result === "Pass" 
    ? {pass:a.pass+1}
    : {fail:a.fail+1};

const getCount = () => {
    const studentRecords = data.markSheets.map(getStudentDetails);
    const dict = reduce(studentRecords,(a,b)=>({...a,...counter(a,b)}),{pass:0, fail:0});
    return dict;
}
const getFinalMarkSheet = () => {
    const studentRecords =  data.markSheets.map(getStudentDetails);
    const sortedRecords = studentRecords.sort((a,b) => b.total - a.total);
    let rank = 0;
   const updatedMarkSheet =  sortedRecords.map(markSheet => ({
    ...markSheet,
    rank:markSheet.result === "Pass" ? rank+=1 : "-",
   })
   );
    return updatedMarkSheet;
};

const getStudentData = () => {
    const StudentDataList = getFinalMarkSheet();
    const Count = getCount();
    return [
        ...StudentDataList,
        Count,
    ]
};
console.table(getStudentData());
