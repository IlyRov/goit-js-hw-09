
const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
  e.preventDefault(); 

  const delay = parseInt(form.querySelector('input[name="delay"]').value);
  const step = parseInt(form.querySelector('input[name="step"]').value);
  const amount = parseInt(form.querySelector('input[name="amount"]').value);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    alert('Please enter valid numbers for delay, step, and amount.');
    return;
  }

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
