$(function () {
    //socket接続
    const socket = io();

    //画像プレビュー
    const image = $('#image').on('change', function(){
        const fileLists = $(this).prop('files');
        const reader = new FileReader();
        reader.readAsDataURL(fileLists[0]);
        
        reader.onload = () => {
            $('<img width="200" class="preview">').attr('src',reader.result).appendTo('body');
        }            
    });
    
    //送信ボタン押下時、画像送信イベント発火
    $('form').submit(() => {
        const src = $('.preview').attr('src');
        socket.emit('img send', src);
        return false;
    });

    //画像を受信する
    socket.on('img send', (img) => {
        console.log(img)
        $('<img width="200" class="preview">').attr('src',img).appendTo('body');
    });
});