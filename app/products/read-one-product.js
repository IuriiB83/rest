jQuery(function($){

    // обрабатываем нажатие кнопки «Просмотр товара» 
    $(document).on('click', '.read-one-product-button', function(){
        var id = $(this).attr('data-id');
        // чтение записи товара на основе данного идентификатора 
$.getJSON("http://api.ibstudio.org/api/product/read_one.php?id=" + id, function(data){
    // начало html 
var read_one_product_html=`
<!-- при нажатии будем отображать список товаров -->
<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
    <span class='glyphicon glyphicon-list'></span>All products
</div>
<!-- полные данные о товаре будут показаны в этой таблице -->
<table class='table table-bordered table-hover'>

    <tr>
        <td class='w-30-pct'>Name</td>
        <td class='w-70-pct'>` + data.name + `</td>
    </tr>

    <tr>
        <td>Price</td>
        <td>` + data.price + `</td>
    </tr>

    <tr>
        <td>Description</td>
        <td>` + data.description + `</td>
    </tr>

    <tr>
        <td>Category</td>
        <td>` + data.category_name + `</td>
    </tr>

</table>`;
// вставка html в «page-content» нашего приложения 
$("#page-content").html(read_one_product_html);

// изменяем заголовок страницы 
changePageTitle("Product view");
});
    });

});