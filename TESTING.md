# Testing for Bark Farmers

## Contents

* [Code Validation](<#code-validation>)
* [Automated Testing](<#automated-testing-with-jest-and-unittest>)
* [Responsiveness Test](<#responsiveness-test>)
* [Known Bugs](<#known-bugs>)
* [Additional Testing](<#additional-testing>)

# Code validation
## CSS Validation
![alt](assets/images/readme/testing/cssValidator.png)

With all due respect to the w3c validator, the scale property does exist. It is a method from the transform property, but can be accessed independantly through the scale property name.

And as much as CSS variables are not statically checked, it functions adequately in this use-case.

## HTML Validation
### Index.html
![alt](assets/images/readme/testing/htmlValidatorIndex.png)

### Order.html
![alt](assets/images/readme/testing/htmlValidatorOrder.png)

### Reviews.html
![alt](assets/images/readme/testing/htmlValidatorReviews.png)

### Register.html
![alt](assets/images/readme/testing/htmlValidatorRegister.png)
Register was chosen to represent testing for all of the account-related forms, as it is the most complex of them.

## PEP8 Compliance testing
PEP8 compliance testing was done using [PEP8 online](http://pep8online.com/)
### Checkout views
![alt](assets/images/readme/testing/PEP8Checkout.png)

This is the result on the checkout view, and all other view files.

# Responsiveness Test
The responsiveness test is split into parts, each representing one of the page templates.

## Index page
![alt](assets/images/readme/testing/responsiveness/indexXL.png)
![alt](assets/images/readme/testing/responsiveness/indexLG.png)
![alt](assets/images/readme/testing/responsiveness/indexSM.png)

(Note: This screenshot was taken before the media query fixing the small white arrow in the "Learn more" text was implemented. The final version is corrected)

## Profile-box
![alt](assets/images/readme/testing/responsiveness/profileXL.png)
![alt](assets/images/readme/testing/responsiveness/profileLG.png)
![alt](assets/images/readme/testing/responsiveness/profileSM.png)

# Known Bugs

# Additional Testing
