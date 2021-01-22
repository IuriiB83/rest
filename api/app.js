jQuery(function($){

    // HTML приложения 
    var app_html=`
        <div class='container'>

            <div class='page-header'>
                <h1 id='page-title'>Все товары</h1>
            </div>

            <!-- здесь будет показано содержимое -->
            <div id='page-content'></div>

        </div>`;

    // вставка кода на страницу 
    $("#app").html(app_html);

});
 
// изменение заголовка страницы 
function changePageTitle(page_title){

    // измение заголовка страницы 
    $('#page-title').text(page_title);

    // измение заголовка вкладки браузера 
    document.title=page_title;
}
 
// функция для создания значений формы в формате json 
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};