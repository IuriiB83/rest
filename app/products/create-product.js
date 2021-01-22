jQuery(function($){

    // показать html форму при нажатии кнопки «создать товар» 
    $(document).on('click', '.create-product-button', function(){
        // загрузка списка категорий 
        $.getJSON("http://api.ibstudio.org/api/category/read.php", function(data){
// перебор возвращаемого списка данных и создание списка выбора 
            var categories_options_html=`<select name='category_id' class='form-control'>`;
            $.each(data.records, function(key, val){
            categories_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
            });
            categories_options_html+=`</select>`;
            var create_product_html=`
            <!-- кнопка для показа всех товаров -->
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
            <span class='glyphicon glyphicon-list'></span>All products
            </div>
            <!-- html форма «Создание товара» -->
            <form id='create-product-form' action='#' method='post' border='0'>
            <table class='table table-hover table-responsive table-bordered'>

            <tr>
                <td>Product</td>
                <td><input type='text' name='name' class='form-control' required /></td>
            </tr>

            <tr>
                <td>Price</td>
                <td><input type='number' min='1' name='price' class='form-control' required /></td>
            </tr>

            <tr>
                <td>Description</td>
                <td><textarea name='description' class='form-control' required></textarea></td>
            </tr>

            <!-- список выбора категории -->
            <tr>
                <td>Category</td>
                <td>` + categories_options_html + `</td>
            </tr>

            <!-- кнопка отправки формы -->
            <tr>
                <td></td>
                <td>
                    <button type='submit' class='btn btn-primary'>
                        <span class='glyphicon glyphicon-plus'></span>Add product
                    </button>
                </td>
            </tr>

            </table>
            </form>`;
            // вставка html в «page-content» нашего приложения 
            $("#page-content").html(create_product_html);

            // изменяем тайтл 
            changePageTitle("Add product");
        });
    });

    // будет работать, если создана форма товара 
$(document).on('submit', '#create-product-form', function(){
    // получение данных формы 
    var form_data=JSON.stringify($(this).serializeObject());

    // отправка данных формы в API 
    $.ajax({
        url: "http://api.ibstudio.org/api/product/create.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            // продукт был создан, вернуться к списку продуктов 
            showProducts();
        },
        error: function(xhr, resp, text) {
            // вывести ошибку в консоль 
            console.log(xhr, resp, text);
        }
    });
    
    return false;
});
});