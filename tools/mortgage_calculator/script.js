document.getElementById('calculateBtn').addEventListener('click', function() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100; // Convert % to decimal
    const loanTermYears = parseInt(document.getElementById('loanTerm').value);
    const propertyTax = parseFloat(document.getElementById('propertyTax').value);
    const insurance = parseFloat(document.getElementById('insurance').value);


     // Validate inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTermYears) || isNaN(downPayment) || isNaN(propertyTax) || isNaN(insurance) ||
    loanAmount <= 0 || interestRate <= 0 || loanTermYears <= 0 || downPayment < 0 || propertyTax < 0 || insurance < 0) {
        document.getElementById('result').textContent = "Please enter valid positive numbers for all fields.";
        document.getElementById('amortization').innerHTML = "";
        return;
    }

     const principal = loanAmount - downPayment;


    // Calculate monthly payment
    const loanTermMonths = loanTermYears * 12;
    const monthlyInterestRate = interestRate / 12;
     const monthlyPropertyTax = propertyTax/ 12;
     const monthlyInsurance = insurance / 12;
    const monthlyPayment = calculateMonthlyPayment(principal, monthlyInterestRate, loanTermMonths);
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance

    // Display the result
    const formattedPayment = totalMonthlyPayment.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    document.getElementById('result').textContent = `Total Monthly Payment: ${formattedPayment}`;

    // Generate and display amortization schedule
      const amortizationSchedule = generateAmortizationSchedule(principal, monthlyInterestRate, loanTermMonths, monthlyPayment);
     displayAmortizationSchedule(amortizationSchedule)

});

function calculateMonthlyPayment(loanAmount, monthlyInterestRate, loanTermMonths) {
    // Formula for monthly payment: M = P [ i(1+i)^n ] / [ (1+i)^n – 1]
    if (monthlyInterestRate === 0) {
        return loanAmount / loanTermMonths; // Avoid divide by zero
    }
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1;
    return numerator / denominator;
}

function generateAmortizationSchedule(principal, monthlyInterestRate, loanTermMonths, monthlyPayment) {
    let balance = principal;
    let schedule = [];
    for (let i = 1; i <= loanTermMonths; i++) {
      const interest = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interest;
        balance -= principalPayment;
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interest,
        balance: balance
      });
    }
    return schedule;
  }

  function displayAmortizationSchedule(schedule) {
    const table = document.createElement('table');
    table.classList.add('amortization');
    let headerRow = table.insertRow();
    headerRow.innerHTML = "<th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th>";
    schedule.forEach(payment => {
      let row = table.insertRow();
        row.innerHTML = `<td>${payment.month}</td>
                         <td>${payment.payment.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
                        <td>${payment.principal.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
                        <td>${payment.interest.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
                        <td>${payment.balance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>`;
    });
    const amortizationDiv = document.getElementById('amortization');
    amortizationDiv.innerHTML = '';
    amortizationDiv.appendChild(table);
  }