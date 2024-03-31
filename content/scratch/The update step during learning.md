The update step consists of:
1. Update the model (spreadsheet with rows). (happens during understand(), and predict()).
2. Update value, similarity functions.
3. Update the patience, satiation functions (later).

How does the value and similarity functions update?

Similarity function updates when confidence in a truth increases. Why? Because it makes it more likely to make jumps similar to the jump between the previous truth to this truth.

And when does a confidence in a truth increase? When we observe something that supports what we believe.

The value function is updated when you get what you want, and you feel that the the truth you believed in is a cause for getting what you want - to the degree to which you believe the truth was the cause, and the magnitude of what you got.
(todo: show this with an example).

OK, where does this point go? 