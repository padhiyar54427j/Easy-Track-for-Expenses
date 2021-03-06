var balance = 0;
var data = document.getElementById("dataList");
var expenses = [];
var header = "<tr>" + "<td style='width:100px; color:green;'>" + "<b>" + "Date" + "</b>" + "</td>" +
                        "<td style='width:100px; color:green;'>" + "<b>" + "Category" + "</b>" + "</td>" +
                        "<td style='width:20px; color:green;'>" + "<b>" + "Amount" + "</b>" + "</td>" +
                        "<td>" + "</td>" +
                        "<td style='width:20px; color:green;'>" + "<b>" + "Edit" + "</b>" + "</td>" +
                        "<td style='width:20px; color:green;'>" + "<b>" + "Delete" + "</b>" + "</td>" +
            "</tr>"


function Expense( expense, category, dateExp){
                                                this.expense = expense;
                                                this.category = category;
                                                this.dateExp = dateExp;
                                            }


function addSalary(){
                        if( document.getElementById( "Salary" ).value == "" ){ alert("Enter Your Amount") }
                        else{ 
                                balance += parseInt( document.getElementById( "Salary" ).value )
                                document.getElementById( "Salary" ).value = ""
                                showSalary()
                         }
                    }


function showSalary(){
                        document.getElementById( "currentSalary" ).innerText = balance
                    }


function addExpense(){
                        var expense = document.getElementById( "expense" );
                        var category = document.getElementById( "category" );
                        var dateExp = document.getElementById( "dateExpense" );
                        var dateFilter = document.getElementById( 'dateFilter' )

                        if( expense.value == "" ){ alert( "Enter your Expense Amount" ) }
                        else if( dateExp.value == "" ){ alert( "Please Choose Expense Date" ) }
                        else if( category.value == "categories" ){ alert( "Chosse Your Expense Category" ) }
                        else{ 
                                var newExpense = new Expense( parseInt( expense.value ), category.value, dateExp.value )
                                expenses.push( newExpense )
                                balance -= parseInt( expense.value )
                                dateFilter.innerHTML += "<option>" + dateExp.value + "</option>"
                                showSalary()
                                renderItem()
                                valueReset()
                            }
                    }


function valueReset(){
                        document.getElementById( "expense" ).value = ""
                        document.getElementById( "category" ).value = "Categories"
                        document.getElementById( "dateExpense" ).value = ""
                    }


function renderItem()
{
                        var item = "" ;
                        for( var i=0; i<expenses.length; i++ )
                        {
                            item = "<tr>" + "<td>" + expenses[ i ].dateExp + "</td>" +
                                            "<td>" + expenses[ i ].category + "</td>" +
                                            "<td>" + expenses[ i ].expense + "</td>" +
                                            "<td>" + "<button onclick = 'editItem(this)' >" + "edit" + "</button>" + "</td>" +
                                            "<td>" + "<button onclick = 'deleteItem(this)' >" + "delete" + "</button>" + "</td>" +
                            "</tr>"
                        }
                        data.innerHTML += item                                    
}


function showFilterExpense()
{
    var dateFilter = document.getElementById( 'dateFilter' ).value
    var category = document.getElementById( "showExpense" ).value;

    var item = "";

    for( var i=0; i<expenses.length; i++ )
    {                                 
        
        if( category == "Categories" && dateFilter == "Date" )
        {
            item += "<tr>" + "<td>" + expenses[i].dateExp + "</td>" +
                            "<td>" + expenses[i].category + "</td>" +
                            "<td>" + expenses[i].expense + "</td>" +
                            "<td>" + "<button onclick = 'editItem(this)'>" + "edit" + "</button>" + "</td>" +
                            "<td>" + "<button onclick = 'deleteItem(this)'>" + "delete" + "</button>" + "</td>" +
                    "</tr>"
        }

        if( category == expenses[i].category && dateFilter == "Date" )
        {
            item += "<tr>" + "<td>" + expenses[i].dateExp + "</td>" +
                            "<td>" + expenses[i].category + "</td>" +
                            "<td>" + expenses[i].expense + "</td>" +
                            "<td>" + "<button onclick = 'editItem(this)'>" + "edit" + "</button>" + "</td>" +
                            "<td>" + "<button onclick = 'deleteItem(this)'>" + "delete" + "</button>" + "</td>" +
                    "</tr>"
        }

        if( category == expenses[i].category && dateFilter == expenses[i].dateExp )
        {
            item += "<tr>" + "<td>" + expenses[i].dateExp + "</td>" +
                            "<td>" + expenses[i].category + "</td>" +
                            "<td>" + expenses[i].expense + "</td>" +
                            "<td>" + "<button onclick = 'editItem(this)'>" + "edit" + "</button>" + "</td>" +
                            "<td>" + "<button onclick = 'deleteItem(this)'>" + "delete" + "</button>" + "</td>" +
                    "</tr>"
        }

        if( category == "Categories" && dateFilter == expenses[i].dateExp )
        {
        item += "<tr>" + "<td>" + expenses[i].dateExp + "</td>" +
                         "<td>" + expenses[i].category + "</td>" +
                         "<td>" + expenses[i].expense + "</td>" +
                         "<td>" + "<button onclick = 'editItem(this)'>" + "edit" + "</button>" + "</td>" +
                         "<td>" + "<button onclick = 'deleteItem(this)'>" + "delete" + "</button>" + "</td>" +
                "</tr>"
        }
    }
        data.innerHTML = header + item
}


function editItem(i)
{
    var dateExp = i.parentNode.parentNode.childNodes[0].innerHTML   
    var oldValue = i.parentNode.parentNode.childNodes[1].innerHTML   
    var oldAmount = i.parentNode.parentNode.childNodes[2].innerHTML

    var newAmount = i.parentNode.parentNode.childNodes[2].innerHTML = +prompt( 'Enter New Amount', oldAmount )   
    var diffAmount = oldAmount - newAmount

    balance = document.getElementById( "currentSalary" ).innerHTML = balance + diffAmount

    for( var i=0; i<expenses.length; i++)
    {
        if( expenses[i].category == oldValue   &&   expenses[i].dateExp == dateExp   &&   expenses[i].expense == oldAmount )
        {
            expenses[i].expense == newAmount
        }
    }
}


function deleteItem(i)
{
    var dateExp = i.parentNode.parentNode.childNodes[0].innerHTML   
    var oldValue = i.parentNode.parentNode.childNodes[1].innerHTML   
    var oldAmount = i.parentNode.parentNode.childNodes[2].innerHTML   
    
    i.parentNode.parentNode.remove()

    for( var j=0; j<expenses.length; j++)
    {
        if( expenses[j].category == oldValue   &&   expenses[j].dateExp == dateExp   &&   expenses[j].expense == oldAmount )
        {
            expenses.splice( j, 1 )
            balance = document.getElementById("currentSalary").innerText = parseInt( balance ) + parseInt( oldAmount )
        }
    }
}

