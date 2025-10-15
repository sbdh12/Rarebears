
function renderPaymentOptions() {
    const walletContainer = document.getElementById('wallet-options');
    const upiContainer = document.getElementById('upi-options');

    const wallet_methods = ['paytm-icon', 'google-pay-icon'];
    const upi_methods = ['paytm-icon', 'google-pay-icon', 'amazon-pay-icon', 'phonepe-icon'];

    walletContainer.innerHTML = ''; // Clear existing content
    upiContainer.innerHTML = ''; // Clear existing content

    wallet_methods.forEach(method => {
        const iconDiv = document.createElement('div');
        iconDiv.className = `payment-icon ${method}`;
        iconDiv.dataset.method = method;
        walletContainer.appendChild(iconDiv);
    });

    upi_methods.forEach(method => {
        const iconDiv = document.createElement('div');
        iconDiv.className = `payment-icon ${method}`;
        iconDiv.dataset.method = method;
        upiContainer.appendChild(iconDiv);
    });

    document.querySelectorAll('.payment-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            // Deselect all icons
            document.querySelectorAll('.payment-icon').forEach(i => i.classList.remove('selected'));
            // Select the clicked icon
            icon.classList.add('selected');
        });
    });
}


async function renderCheckoutSummary() {
    const cart = getCart();
    const container = document.getElementById('checkout-summary-container');
    const totalPriceEl = document.getElementById('checkout-total-price');
    
    if (!container || !totalPriceEl) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
        totalPriceEl.textContent = '₹0.00';
        return;
    }

    const res = await fetch(`products.json?v=${new Date().getTime()}`);
    const data = await res.json();
    
    let subtotal = 0;

    cart.forEach(item => {
        const product = data[item.category].find(p => p.id === item.id);
        if (product) {
            const price = parseFloat(product.price.replace(/[₹,]/g, ''));
            subtotal += price * item.quantity;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex justify-between items-center';
            
            itemDiv.innerHTML = `
                <div>
                    <p class="font-medium">${product.name}</p>
                    <p class="text-gray-500 text-sm">Qty: ${item.quantity}</p>
                </div>
                <p class="font-medium">₹${(price * item.quantity).toFixed(2)}</p>
            `;
            container.appendChild(itemDiv);
        }
    });

    const checkoutSubtotal = localStorage.getItem('checkoutSubtotal');
    if (checkoutSubtotal) {
        totalPriceEl.textContent = checkoutSubtotal;
    } else {
        totalPriceEl.textContent = `₹${subtotal.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPaymentOptions();

    const payNowBtn = document.getElementById('pay-now-btn');
    payNowBtn.addEventListener('click', () => {
        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postal-code').value;
        const selectedPayment = document.querySelector('.payment-icon.selected');

        if (!fullName || !address || !city || !postalCode) {
            alert('Please fill in all shipping information fields.');
            return;
        }

        if (!selectedPayment) {
            alert('Please select a payment method.');
            return;
        }

        // Simulate a payment processing delay
        setTimeout(() => {
            alert('Payment successful! Your order has been placed.');

            // Clear the cart AFTER payment is successful
            saveCart([]);

            window.location.href = 'index.html';
        }, 1500); // 1.5 second delay to simulate payment processing
    });
});
