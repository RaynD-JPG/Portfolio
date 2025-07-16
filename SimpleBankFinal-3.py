def depositAmount(accountNumber, DAmount):
    if(DAmount>0):
        accounts[accountNumber]['balance'] += DAmount
        print(str(accounts[accountNumber]['balance']) + "$ is your current balance")
    else:
        print("invalid deposit amount try again!!")
    
def withdrawAmount(accountNumber, WAmount):
    if(WAmount > 0 and WAmount <= accounts[accountNumber]['balance']):
        accounts[accountNumber]['balance'] -= WAmount
        print(str(accounts[accountNumber]['balance']) + "$ is your current balance")

    else:
        print("invalid withdraw amount, try again!!")

def balanceInquiry(accountNumber):

    print(str(accounts[accountNumber]['balance']) +"$ is your current balance")


accounts = {
    '23': {'password': 'MegaBoss', 'balance': 20000000000} #this is my account
}



def createAccount():
    accountNumber = input("Please enter the desired Account Number(it needs to be unique): ")
    if(accountNumber in accounts):
        print("account number already exists try another account number")
        return
    password = input("Please insert the password for this Account Number: ")
    initialBalance = input("Please insert the initial deposit for this account: ")
   
    accounts[accountNumber] = {
    'password': password,
    'balance': int(initialBalance)  
}
    print("Account succesfully created you can access it from the login menu Congrats")


def login():
    accountNumber = input("Enter your account number: ")
    if accountNumber in accounts:
        password = input("Insert the password associated with the account: ")
        if accounts[accountNumber]['password'] == password:
            print("Logging you into your account.......")
            bankingSystem(accountNumber)
        else:
            print("Wrong password, try again.")
    else:
        print("Account number not found.")


 
def bankingSystem(accountNumber):
    account = accounts[accountNumber]

    while True:
        print("\n1.Deposit into account")
        print("2.Withdraw from account")
        print("3.Check current balance")
        print("4.Log Out")
        option = input("choose what you want to do: ")

        if(option == "1"):
            DAmount = int(input("Enter deposit amount: "))
            depositAmount(accountNumber,DAmount)
        elif(option == "2"):
            WAmount = int(input("Enter the amount to withdraw: "))
            withdrawAmount(accountNumber,WAmount)
        elif(option =="3"):
            print(str(accounts[accountNumber]['balance'])+"$ is your current balance" )
        elif(option == "4"):
            print("Logging Out....")
            break
        else:
            print("this is not an option")

def loginSystem():

    while True:
        print("\n1. Create Account")
        print("2. Log in")
        print("3. Exit")

        option = input("choose what you want to do: ")
        if(option == "1"):
            createAccount()
        elif(option == "2"):
            login()
        elif(option == "3"):
            print("Exiting now....")
            break
        else:
            print("this is not an option")
        
    
loginSystem()
