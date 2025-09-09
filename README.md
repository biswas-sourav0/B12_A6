<h1> Answer to the question no: 1 </h1>
<ul>
  <li>1. var
    <ol> ফাংশন-স্কোপড (Function Scoped)।
 </ol>
    <ol>একই ভ্যারিয়েবল একাধিকবার ডিক্লেয়ার করা যায়।</ol>
    <ol>Hoisting হয় (ডিক্লেয়ারেশনের আগে ব্যবহার করা যায়, তবে মান হবে `undefined`)।
</ol>
  </li>
</ul>

<ul>
  <li>2. let
    <ol> *ব্লক-স্কোপড (Block Scoped)</ol>
    <ol>*একই ব্লকের মধ্যে একাধিকবার ডিক্লেয়ার করা যায় না।</ol>
    <ol>*Hoisting হয়, কিন্তু ব্যবহার করার আগে ডিক্লেয়ার করতে হয়।.</ol>
  </li>
</ul>
<ul>
  <li>3. const
    <ol>*ব্লক-স্কোপড। </ol>
    <ol>*একবার মান অ্যাসাইন করলে পরে পরিবর্তন করা যায় না।</ol>
    <ol>*সাধারণত কনস্ট্যান্ট ভ্যালু রাখার জন্য ব্যবহার করা হয়।.</ol>
  </li>
</ul>


<h1> Answer to the question no: 2 </h1>
<ul>
  <li>1. map
    <ol> একটি নতুন অ্যারে রিটার্ন করে।
 </ol>
    <ol>প্রতিটি আইটেম পরিবর্তন করে নতুন অ্যারে তৈরি করতে ব্যবহার হয়।</ol>
    <ol>```javascript
const numbers = [1, 2, 3];
const double = numbers.map(n => n * 2);
console.log(double); // [2, 4, 6]
</ol>
  </li>
</ul>

<ul>
  <li>2. forEach()
    <ol> *নতুন অ্যারে তৈরি করে না।</ol>
    <ol>*এশুধু লুপ চালিয়ে প্রতিটি আইটেমের উপর কাজ করতে দেয়।</ol>
    <ol>*const numbers = [1, 2, 3];
numbers.forEach(n => console.log(n * 2)); </ol>
  </li>
</ul>
<ul>
  <li>3. filter()
    <ol>*একটি নতুন অ্যারে রিটার্ন করে।</ol>
    <ol>*শর্ত অনুযায়ী আইটেমগুলো ফিল্টার করে আনে।</ol>
    <ol>*const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(n => n % 2 === 0);
console.log(even);</ol>
  </li>
</ul>

<h1>Answer to the question no: 3 </h1>
<h3> Arrow Functions </h3>
<ul> 
  <li>ছোট ও সহজভাবে ফাংশন লেখার জন্য Arrow Function ব্যবহার করা হয়।</li>
  <li>function কীওয়ার্ড লিখতে হয় না।</li>
  <li>this লেক্সিক্যাল স্কোপ অনুসারে কাজ করে।</li>
  <li> Example : const addArrow = (a, b) => a + b;</li>

<h1>Answer to the question no: 4 </h1>
<p>Definition:

Destructuring assignment (ES6) হলো এমন একটি সিনট্যাক্স, যেটার মাধ্যমে অ্যারে বা অবজেক্ট থেকে ভ্যালু আলাদা করে সহজে ভ্যারিয়েবলে রাখা যায়।</p>
<p></p>
 <li>How it Works
    <ol>উদাহরণ

অ্যারে:

const [a, b] = [10, 20];
console.log(a); 
console.log(b);
</ol>
    <ol>*অবজেক্ট:

const { name, age } = { name: "Sourav", age: 25 };
console.log(name); 
console.log(age);
</ol>
    

  <h1>Answer to the Question no: 5 </h1>
  <P>Template Literals</P>
  <li>
    <ol>*Template literals দিয়ে স্ট্রিং এর মধ্যে ভ্যারিয়েবল বা এক্সপ্রেশন সহজে ব্যবহার করা যায়।</ol>
    <ol>*ব্যাকটিক ` ব্যবহার করা হয়।</ol>
    <ol>*মাল্টি-লাইন স্ট্রিং লেখা সহজ হয়।</ol>
  </li>

