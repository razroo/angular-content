 ---
 title: Input
 --- 

The Input decorator is one of two integral Angular Decorators,
instrumental for passing into a component, and out of a component into a
another one. It's name sounds like what it does. Similar to an html
input, a user inputs a value and that's the value that the form now has.

Similarly, for an Angular component, you can put a name on what you
would like your input is. Use that anticipated input value/name within
your component. Now, you have the ability to re-use your component in
multiple places, and pass in the data of your choosing based on the
Input value you used.

It is important to realize that \@Input and creating a re-usable
component go hand in hand. If you would like to create a re-usable
component, 9/10 times (rough estimate), you will need to use an \@Input
decorator. Ok, so let's get down to how to use it.

 Input - An Example 
-------------------

Here is a great example.

Let's say we have a bank account component, that we would like to
create. This bank account component will be used on multiple pages for
our web application. It will be displayed in multiple places. Sometimes
in the header, sometimes in a modal, or to display the bank used by
someone else, within your network.

    // bank account component - bank-acount.component.ts
    @Component({
      selector: 'bank-account',
      template: './bank-account.component.html',
    })
    class BankAccount {
      // This property is bound using its original name.
      @Input() bankName: string;
      // this property value is bound to a different property name
      // when this component is instantiated in a template.
      @Input() id: string;
    }

In the html of your bank-account component:

    <div> Bank Name: {{ bankName }} </div>
    <div> Account Id: {{ id }} </div>

As we can see in the above code, our \@Input's are considered as if they
are a value contained directly on our components.

###  Including Component in another Component 

Now we have the ability to include this component with an Input in
another component:

    <bank-account bankName="RBC" id="4747"></bank-account>

This would be \@Input() in a nutshell.

 bindPropertyName 
-----------------

Input() does allow for an optional bindingPropertyName. This would mean
that the re-usable component would internally refer to the Input value
as one way, and the consuming component would refer to it, in another.

    // bank account component - bank-acount.component.ts
    @Component({
      selector: 'bank-account',
      template: './bank-account.component.html',
    })
    class BankAccount {
      // This property is bound using its original name.
      @Input() bankName: string;
      // this property value is bound to a different property name
      // when this component is instantiated in a template.
      @Input('bank-account') id: string;
    }

In the html of your bank-account component:

    <div> Bank Name: {{ bankName }} </div>
    <div> Account Id: {{ id }} </div>

In the html of the component consuming the bank-account component.

    <bank-account bankName="RBC" bank-account="4747"></bank-account>
