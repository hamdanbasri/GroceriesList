const csvUrl = 'https://raw.githubusercontent.com/hamdanbasri/GroceriesList/main/GroceryTest.csv'; // Replace with your actual GitHub raw CSV URL

    const groceries = {}; // { ingredient: { quantity: number, price: number } }

    function addDish(data, startCol) {
      const name = data[0][startCol];
      const button = document.createElement('button');
      button.innerText = `Add ${name}`;
      button.onclick = () => {
        for (let i = 1; i < data.length; i++) {
          const ingredient = data[i][startCol];
          const qty = parseFloat(data[i][startCol + 1]) || 0;
          const price = parseFloat(data[i][startCol + 2]) || 0;
          if (!ingredient) continue;

          if (!groceries[ingredient]) {
            groceries[ingredient] = { quantity: 0, price: 0 };
          }
          groceries[ingredient].quantity += qty;
          groceries[ingredient].price += price;
        }
        renderGroceries();
      };
      const container = document.createElement('div');
      container.className = 'dish';
      container.appendChild(button);
      document.getElementById('dishes').appendChild(container);
    }

    function renderGroceries() {
      const list = document.getElementById('groceries-list');
      list.innerHTML = '';
      let total = 0;
      for (const [item, { quantity, price }] of Object.entries(groceries)) {
        const li = document.createElement('li');
        li.innerText = `${item}: ${quantity} (RM ${price.toFixed(2)})`;
        list.appendChild(li);
        total += price;
      }
      document.getElementById('total-price').innerText = total.toFixed(2);
    }

    // Load CSV from GitHub and parse it
    fetch(csvUrl)
      .then(response => response.text())
      .then(csvText => {
        const result = Papa.parse(csvText, { header: false });
        const data = result.data;
        for (let col = 0; col < data[0].length; col += 3) {
          addDish(data, col);
        }
      });