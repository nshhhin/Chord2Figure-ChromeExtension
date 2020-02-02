$(function(){

    console.log("Chrome拡張起動中...");
      chrome.tabs.getSelected(null, function(tab){
        var output = "";
        var url = "{1}".replace("{1}", tab.url);
        var itunes_id = "";
        var match = url.match(/i=(\d+)/);
        
        if (match != null) {
            itunes_id = match[1];
        } 

            // jQuery
        $(document).ready(function() {
          $("#add-btn").click(ClickedAddBtn);
        });

        function ClickedAddBtn() {
          var i = $("#selection").val()
          console.log(i + "がクリックされましたー");

          // uniottoデータベースに追加する
          var req_url = "https://uniotto.org/api/add_itunes_into_otofuda_list.php?itunes_id=" + itunes_id + "&list_id=" + i;

          $.getJSON(req_url, function(data, status) {
            $("#result").append("リストに追加したった!");
          });

    }

        $.ajax({
          url: 'https://uniotto.org/api/get_all_otofuda_list.php',
          type: 'get', // getかpostを指定(デフォルトは前者)
          dataType: 'json' // 「json」を指定するとresponseがJSONとしてパースされたオブジェクトになる
        })

        // ・ステータスコードは正常で、dataTypeで定義したようにパース出来たとき
        .done(function (response) {
            // console.log(response.data["result"]);
            var status = response["result"];
            var list = response["list"];

            for (var i = 0; i < list.length; i++) {
              $('#selection').append("<option value=" +list[i]["id"]+ ">" + list[i]["title"] +"</option>");
            }
        })

        // ・サーバからステータスコード400以上が返ってきたとき
        // ・ステータスコードは正常だが、dataTypeで定義したようにパース出来なかったとき
        // ・通信に失敗したとき
        .fail(function () {
            $('#result').val('失敗');
            $('#detail').val('');
        });

        output += itunes_id + "を追加";
        $('#text').text(output).append("<br/>");

        // uniottoデータベースに追加する
        var req_url = "https://uniotto.org/api/add_itunes.php?id=" + itunes_id;

        $.getJSON(req_url, function(data, status) {
          $("#text").append("status：" + data.status).append("<br/>");
          if ( data.status == "error" ) {
            $("#text").append("この楽曲は既に追加済みです").append("<br/>");
          } else if ( data.status == "success" ) {
            $("#text").append("artist：" + data.artist).append("<br/>");
            $("#text").append("title：" + data.title).append("<br/>");
            $("#text").append("追加しました").append("<br/>");
              // $("#json").append("artist：" + data.video_info.channel_name).append("<br/>");
              // $("#text").append("<button id='delete'>追加を取り消す</button>");
          } else if ( data.status = "added" ) {
            $("#text").append("追加済みです").append("<br/>");
          }
      });

  });
});

  