var app = new Vue({
    el: '#app', 
    data: {
        // list购物车商品列表  商品名称、单价、购买数量 (实际中通过Ajax从服务端动态获取的)
        list: [
            {
                id: 1, 
                name: 'iPhone 7',
                price: 6188, 
                count: 1
            },
            {
                id: 2, 
                name: 'iPad Pro',
                price: 5888, 
                count: 1
            },
            {
                id: 3, 
                name: 'MacBook Pro',
                price: 21488, 
                count: 1
            }
        ]

    },
    computed: {
        totalPrice: function() {
            var total = 0;
            for(var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                total += item.count * item.price;
            }
            // (?=pattern)正向肯定预查,在任何匹配pattern的字符串开始处匹配查找字符串
            // 非单词边界/正向肯定预查/全局匹配 千位分隔符的转换 
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
        }
    },
    methods: {
        handleReduce: function(index) {
            if (this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function(index) {
            this.list[index].count++;
        },
        handleRemove: function(index) {
            this.list.splice(index, 1);
        }
    }
});