jQuery(function($){

    // показывать html форму при нажатии кнопки «Обновить товар» 
    $(document).on('click', '.update-product-button', function(){

        // получаем ID товара 
        var id = $(this).attr('data-id');
        // читаем одну запись на основе данного идентификатора товара 
$.getJSON("http://api.ibstudio.org/api/product/read_one.php?id=" + id, function(data){

    // значения будут использоваться для заполнения нашей формы 
    var name = data.name;
    var price = data.price;
    var description = data.description;
    var category_id = data.category_id;
    var category_name = data.category_name;

    // загрузка списка категорий 
$.getJSON("http://rest-api/api/category/read.php", function(data){

    // строим список выбора 
    // перебор полученного списка данных 
    var categories_options_html=`<select name='category_id' class='form-control'>`;

    $.each(data.records, function(key, val){
        // опция предварительного выбора - это идентификатор категории 
        if (val.id==category_id) {
            categories_options_html+=`<option value='` + val.id + `' selected>` + val.name + `</option>`;
        } else {
            categories_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`; 
        }
    });
    categories_options_html+=`</select>`;

    // сохраним html в переменной «update product» 
var update_product_html=`
<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
    <span class='glyphicon glyphicon-list'></span> Все товары
</div>

<!-- построение формы для изменения товара -->
<!-- мы используем свойство 'required' html5 для предотвращения пустых полей -->
<form id='update-product-form' action='#' method='post' border='0'>
    <table class='table table-hover table-responsive table-bordered'>

        <tr>
            <td>Название</td>
            <td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
        </tr>

        <tr>
            <td>Цена</td>
            <td><input value=\"` + price + `\" type='number' min='1' name='price' class='form-control' required /></td>
        </tr>

        <tr>
            <td>Описание</td>
            <td><textarea name='description' class='form-control' required>` + description + `</textarea></td>
        </tr>

        <tr>
            <td>Категория</td>
            <td>` + categories_options_html + `</td>
        </tr>

        <tr>
            <!-- скрытый «идентификатор продукта», чтобы определить, какую запись удалить -->
            <td><input value=\"` + id + `\" name='id' type='hidden' /></td>

            <!-- кнопка отправки формы -->
            <td>
                <button type='submit' class='btn btn-info'>
                    <span class='glyphicon glyphicon-edit'></span> Обновить товар
                </button>
            </td>
        </tr>

    </table>
</form>
`;

// добавим в «page-content» нашего приложения 
$("#page-content").html(update_product_html);

// изменим title страницы 
changePageTitle("Обновление товара");
});
    });


    });

    // будет запущен при отправке формы обновления товара 
$(document).on('submit', '#update-product-form', function(){

    // получаем данные формы 
    var form_data=JSON.stringify($(this).serializeObject());

    // отправка данных формы в API 
    $.ajax({
        url: "http://api.ibstudio.org/api/product/update.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            // продукт был создан, возврат к списку продуктов 
            showProducts();
        },
        error: function(xhr, resp, text) {
            // вывод ошибки в консоль 
            console.log(xhr, resp, text);
        }
    });

    return false;
});
});