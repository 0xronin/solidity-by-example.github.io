// metadata
export const version = "0.8.17"
export const title = "Write to Any Slot"
export const description = "Write to Any Slot"
export const codes = [
  {
    fileName: "Slot.sol",
    code: "Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4xNzsKCmNvbnRyYWN0IFN0b3JhZ2UgewogICAgc3RydWN0IE15U3RydWN0IHsKICAgICAgICB1aW50IHZhbHVlOwogICAgfQoKICAgIC8vIHN0cnVjdCBzdG9yZWQgYXQgc2xvdCAwCiAgICBNeVN0cnVjdCBwdWJsaWMgczAgPSBNeVN0cnVjdCgxMjMpOwogICAgLy8gc3RydWN0IHN0b3JlZCBhdCBzbG90IDEKICAgIE15U3RydWN0IHB1YmxpYyBzMSA9IE15U3RydWN0KDQ1Nik7CiAgICAvLyBzdHJ1Y3Qgc3RvcmVkIGF0IHNsb3QgMgogICAgTXlTdHJ1Y3QgcHVibGljIHMyID0gTXlTdHJ1Y3QoNzg5KTsKCiAgICBmdW5jdGlvbiBfZ2V0KHVpbnQgaSkgaW50ZXJuYWwgcHVyZSByZXR1cm5zIChNeVN0cnVjdCBzdG9yYWdlIHMpIHsKICAgICAgICAvLyBnZXQgc3RydWN0IHN0b3JlZCBhdCBzbG90IGkKICAgICAgICBhc3NlbWJseSB7CiAgICAgICAgICAgIHMuc2xvdCA6PSBpCiAgICAgICAgfQogICAgfQoKICAgIC8qCiAgICBnZXQoMCkgcmV0dXJucyAxMjMKICAgIGdldCgxKSByZXR1cm5zIDQ1NgogICAgZ2V0KDIpIHJldHVybnMgNzg5CiAgICAqLwogICAgZnVuY3Rpb24gZ2V0KHVpbnQgaSkgZXh0ZXJuYWwgdmlldyByZXR1cm5zICh1aW50KSB7CiAgICAgICAgLy8gZ2V0IHZhbHVlIGluc2lkZSBNeVN0cnVjdCBzdG9yZWQgYXQgc2xvdCBpCiAgICAgICAgcmV0dXJuIF9nZXQoaSkudmFsdWU7CiAgICB9CgogICAgLyoKICAgIFdlIGNhbiBzYXZlIGRhdGEgdG8gYW55IHNsb3QgaW5jbHVkaW5nIHNsb3QgOTk5IHdoaWNoIGlzIG5vcm1hbGx5IHVuYWNjZXNzYmxlLgoKICAgIHNldCg5OTkpID0gODg4IAogICAgKi8KICAgIGZ1bmN0aW9uIHNldCh1aW50IGksIHVpbnQgeCkgZXh0ZXJuYWwgewogICAgICAgIC8vIHNldCB2YWx1ZSBvZiBNeVN0cnVjdCB0byB4IGFuZCBzdG9yZSBpdCBhdCBzbG90IGkKICAgICAgICBfZ2V0KGkpLnZhbHVlID0geDsKICAgIH0KfQo=",
  },
]

const html = `<p>Solidity storage is like an array of length 2^256.
Each slot in the array can store 32 bytes.</p>
<p>State variables define which slots will be used to store data.</p>
<p>However using assembly, you can write to any slot.</p>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.17;</span>

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">Storage</span> </span>{
    <span class="hljs-keyword">struct</span> <span class="hljs-title">MyStruct</span> {
        <span class="hljs-keyword">uint</span> value;
    }

    <span class="hljs-comment">// struct stored at slot 0</span>
    MyStruct <span class="hljs-keyword">public</span> s0 <span class="hljs-operator">=</span> MyStruct(<span class="hljs-number">123</span>);
    <span class="hljs-comment">// struct stored at slot 1</span>
    MyStruct <span class="hljs-keyword">public</span> s1 <span class="hljs-operator">=</span> MyStruct(<span class="hljs-number">456</span>);
    <span class="hljs-comment">// struct stored at slot 2</span>
    MyStruct <span class="hljs-keyword">public</span> s2 <span class="hljs-operator">=</span> MyStruct(<span class="hljs-number">789</span>);

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_get</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> i</span>) <span class="hljs-title"><span class="hljs-keyword">internal</span></span> <span class="hljs-title"><span class="hljs-keyword">pure</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params">MyStruct <span class="hljs-keyword">storage</span> s</span>) </span>{
        <span class="hljs-comment">// get struct stored at slot i</span>
        <span class="hljs-keyword">assembly</span> {
            s.<span class="hljs-built_in">slot</span> <span class="hljs-operator">:=</span> i
        }
    }

    <span class="hljs-comment">/*
    get(0) returns 123
    get(1) returns 456
    get(2) returns 789
    */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> i</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-comment">// get value inside MyStruct stored at slot i</span>
        <span class="hljs-keyword">return</span> _get(i).<span class="hljs-built_in">value</span>;
    }

    <span class="hljs-comment">/*
    We can save data to any slot including slot 999 which is normally unaccessble.

    set(999) = 888 
    */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">set</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> i, <span class="hljs-keyword">uint</span> x</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        <span class="hljs-comment">// set value of MyStruct to x and store it at slot i</span>
        _get(i).<span class="hljs-built_in">value</span> <span class="hljs-operator">=</span> x;
    }
}
</code></pre>
`

export default html
