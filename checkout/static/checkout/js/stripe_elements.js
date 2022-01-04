var stripe_public_key = $('#id_stripe_public_key').text().slice(1, -1);
var client_secret = $('#id_client_secret').text().slice(1, -1);
var stripe = Stripe(stripe_public_key);
var elements = stripe.elements();
var card = elements.create('card');
var style = {
    base: {
        color: '#212529',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '1rem',
        fontWeight: '400',
        display: 'block',
        width: '100%',
        padding: '.375rem .75rem',
        lineHeight: '1.5',
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        borderRadius: '.25rem',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#dc3545',
        iconColor: '#dc3545'
    }
};
var card = elements.create('card', {style: style});
card.mount('#card-element');