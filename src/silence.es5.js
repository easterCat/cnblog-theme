"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
  $.extend({
    silence: function silence(options) {
      var silence = new Silence();
      silence.init(options);
    }
  });

  var CDN = {
    lightbox: {
      css: "https://unpkg.com/lightbox2@2.11.1/dist/css/lightbox.min.css",
      js: "https://unpkg.com/lightbox2@2.11.1/dist/js/lightbox.min.js"
    },
    clipboard: {
      js: "https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js"
    }
  };

  var Silence = function () {
    function Silence() {
      _classCallCheck(this, Silence);

      this.defaluts = {
        base: {
          avatar: null,
          favicon: null
        },
        catalog: {
          enable: false,
          move: true,
          index: true,
          level1: "h2",
          level2: "h3",
          level3: "h4"
        },
        signature: {
          author: null,
          enable: false,
          home: "https://www.cnblogs.com",
          license: "CC BY 4.0",
          link: "https://creativecommons.org/licenses/by/4.0"
        },
        sponsor: {
          enable: false,
          text: null,
          paypal: null,
          wechat: null,
          alipay: null
        },
        github: {
          enable: false,
          color: "#fff",
          fill: null,
          link: null
        }
      };

      this.version = "2.0.2";
    }

    _createClass(Silence, [{
      key: "init",


      /**
       * 初始化
       * @param {Object} options 全局配置选项
       */
      value: function init(options) {
        if (options) {
          $.extend(true, this.defaluts, options);
        }
        this.buildCustomElements();
        this.buildGithubCorner();
        this.buildCopyright();
        this.buildBloggerProfile();
        if (this.isPostPage) {
          this.buildPostCatalog();
          this.buildPostCodeCopyBtns();
          this.buildPostLightbox();
          this.buildPostSignature();
          this.buildPostSponsor();
          this.buildToolbar();
          this.buildPostCommentAvatars();
        } else {
          this.showSideBar();
        }
      }

      /**
       * 消息弹窗
       * @param {String} content 消息内容
       */

    }, {
      key: "showMessage",
      value: function showMessage(content) {
        $("body").prepend("<div class=\"esa-layer\"><span class=\"esa-layer-content\">" + content + "</span></div>");
        var $layer = $(".esa-layer");
        $layer.fadeIn(200);
        setTimeout(function () {
          $layer.remove();
        }, 2000);
      }

      /**
       * 显示左侧边栏
       */

    }, {
      key: "showSideBar",
      value: function showSideBar() {
        var $win = $(window);
        if ($win.width() > 767) {
          $(this.cnblogs.forFlow).css({
            marginLeft: "22em"
          });
          $(this.cnblogs.sideBar).fadeIn(600);
        }
      }

      /**
       * 构建自定义 DOM 元素
       */

    }, {
      key: "buildCustomElements",
      value: function buildCustomElements() {
        var _this = this;

        // Change page title.
        var blogTitle = $(this.cnblogs.blogTitle).find("h1 a").html();
        var autherName = $(this.cnblogs.publicProfile).find("a:eq(0)").html();
        var $title = $("head").find("title");
        $title.html($title.html().replace(autherName + " - \u535A\u5BA2\u56ED", "" + blogTitle));

        // Build a tags button on mobile browser.
        var $navList = $(this.cnblogs.navList);
        $navList.find("li").eq(1).after("<li><a id=\"blog_nav_tags\" class=\"menu\" href=\"https://www.cnblogs.com/" + currentBlogApp + "/tag\">\u6807\u7B7E</a></li>");

        $.each($navList.find("li"), function (index, nav) {
          $(nav).append("<i></i>");
        });

        // Build a menu button on mobile browser.
        $("body").prepend("<div class=\"esa-mobile-menu\"></div>");
        $(".esa-mobile-menu").on("click", function () {
          $(_this.cnblogs.navigator).fadeToggle(200);
        });
      }

      /**
       * 构建主题版权信息
       */

    }, {
      key: "buildCopyright",
      value: function buildCopyright() {
        // please don't delete this function.
        var content = "<div> Powered By <a href=\"https://www.cnblogs.com\" target=\"_blank\">Cnblogs</a> |\n            Theme <a href=\"https://github.com/esofar/cnblogs-theme-silence\" target=\"_blank\">Silence v" + this.version + "</a></div>";
        $(this.cnblogs.footer).append(content);
      }

      /**
       * 构建博客签名
       */

    }, {
      key: "buildPostSignature",
      value: function buildPostSignature() {
        var config = this.defaluts.signature;
        if (config.enable) {
          var postUrl = $(this.cnblogs.postTitle).attr("href");
          var authorName = config.author || $(this.cnblogs.publicProfile).find("a:eq(0)").html();

          var content = "<div class=\"esa-post-signature\"> \n                    <p>\u4F5C\u8005\uFF1A<a href=\"" + config.home + "\">" + authorName + "</a></p> \n                    <p>\u51FA\u5904\uFF1A<a href=\"" + postUrl + "\">" + postUrl + "</a></p> \n                    <p>\u7248\u6743\uFF1A\u672C\u7AD9\u4F7F\u7528\u300C<a href=\"" + config.link + "\"  target=\"_blank\">" + config.license + "</a>\u300D\u521B\u4F5C\u5171\u4EAB\u534F\u8BAE\uFF0C\u8F6C\u8F7D\u8BF7\u5728\u6587\u7AE0\u660E\u663E\u4F4D\u7F6E\u6CE8\u660E\u4F5C\u8005\u53CA\u51FA\u5904\u3002</p> \n                </div>";

          $(this.cnblogs.postSignature).html(content).show();
        }
      }

      /**
       * 构建评论者头像
       */

    }, {
      key: "buildPostCommentAvatars",
      value: function buildPostCommentAvatars() {
        var _this2 = this;

        var builder = function builder() {
          $(_this2.cnblogs.postCommentBody).before("<div class='esa-comment-avatar'><a target='_blank'><img /></a></div>");
          var feedbackCon = $(_this2.cnblogs.feedbackContent);
          for (var i = 0; i < feedbackCon.length; i++) {
            var avatar = "https://pic.cnblogs.com/face/sample_face.gif";
            var span = $(feedbackCon[i]).find("span:last")[0];
            if (span) {
              avatar = $(span).html().replace("http://", "//");
            }
            $(feedbackCon[i]).find(".esa-comment-avatar img").attr("src", avatar);
            var href = $(feedbackCon[i]).parent().find(".comment_date").next().attr("href");
            $(feedbackCon[i]).find(".esa-comment-avatar a").attr("href", href);
          }
        };
        if ($(this.cnblogs.postCommentBody).length) {
          builder();
        } else {
          var count = 1;
          // poll whether the feedbacks is loaded.
          var intervalId = setInterval(function () {
            if ($(_this2.cnblogs.postCommentBody).length) {
              clearInterval(intervalId);
              builder();
            }
            if (count == 10) {
              // no feedback.
              clearInterval(intervalId);
            }
            count++;
          }, 500);
        }
      }

      /**
       * 构建赞赏模块
       */

    }, {
      key: "buildPostSponsor",
      value: function buildPostSponsor() {
        var sponsor = this.defaluts.sponsor;
        var github = this.defaluts.github;
        var that = this;
        if (!sponsor.enable) {
          return;
        }

        $("#blog_post_info").prepend("\n            <div class=\"esa-sponsor\">\n                <a class=\"github\" href=\"" + (github.enable ? github.link : "https://github.com/Kaiyuan/donate-page") + "\" target=\"_blank\" class=\"posa tr3\" title=\"Github\"></a>\n                <div class=\"text tr3\">" + (sponsor.text || "Sponsor") + "</div>\n                <ul class=\"box posa tr3\">\n                    <li class=\"paypal\">PayPal</li>\n                    <li class=\"alipay\">AliPay</li>\n                    <li class=\"wechat\">WeChat</li>\n                </ul>\n                <div id=\"QRBox\" class=\"posa left-100\">\n                    <div id=\"MainBox\"></div>\n                </div>\n            </div>");

        var $sponsor = $(".esa-sponsor");
        var QRBox = $("#QRBox");
        var MainBox = $("#MainBox");

        function showQR(QR) {
          if (QR) {
            MainBox.css("background-image", "url(" + QR + ")");
          }
          $sponsor.find(".text, .box, .github").addClass("blur");
          QRBox.fadeIn(300, function () {
            MainBox.addClass("showQR");
          });
        }

        $sponsor.find(".box>li").click(function () {
          var type = $(this).attr("class");
          if (type === "paypal") {
            if (!sponsor.paypal) {
              return that.showMessage("博主忘记设置 PayPal 收款地址");
            }
            window.open(sponsor.paypal, "_blank");
          } else if (type === "alipay") {
            if (!sponsor.alipay) {
              return that.showMessage("博主忘记设置支付宝收款二维码");
            }
            showQR(sponsor.alipay);
          } else if (type === "wechat") {
            if (!sponsor.wechat) {
              return that.showMessage("博主忘记设置微信收款二维码");
            }
            showQR(sponsor.wechat);
          }
        });

        MainBox.click(function () {
          MainBox.removeClass("showQR").addClass("hideQR");
          setTimeout(function (a) {
            QRBox.fadeOut(300, function () {
              MainBox.removeClass("hideQR");
            });
            $sponsor.find(".text, .box, .github").removeClass("blur");
          }, 600);
        });
      }

      /**
       * 构建博客目录
       */

    }, {
      key: "buildPostCatalog",
      value: function buildPostCatalog() {
        var config = this.defaluts.catalog;

        if (config.enable) {
          var levels = [config.level1, config.level2, config.level3];
          var $headers = $(this.cnblogs.postBody).find(levels.join(","));

          if (!$headers.length) {
            return false;
          }

          var $catalog = $("<div class=\"esa-catalog\">\n                        <div class=\"esa-catalog-contents\">\n                            <div class=\"esa-catalog-title\">CONTENTS</div>\n                            <a class=\"esa-catalog-close\">\u2715</a>\n                        </div>\n                    </div>");

          var h1c = 0;
          var h2c = 0;
          var h3c = 0;

          var catalogContents = "<ul>";

          var cryptoObj = window.crypto || window.msCrypto; // for IE 11
          var eleIds = cryptoObj.getRandomValues(new Uint32Array($headers.length));

          $.each($headers, function (index, header) {
            var tagName = $(header)[0].tagName.toLowerCase();
            var text = $(header).text();

            var titleIndex = "";
            var titleContent = text;

            if (!config.index) {
              switch (tagName) {
                case config.level1:
                  titleContent = "<span class=\"level1\">" + titleContent + "</span>";
                  break;
                case config.level2:
                  titleContent = "<span class=\"level2\">" + titleContent + "</span>";
                  break;
                case config.level3:
                  titleContent = "<span class=\"level3\">" + titleContent + "</span>";
                  break;
              }
            } else {
              if (tagName === config.level1) {
                h1c++;
                h2c = 0;
                h3c = 0;
                titleIndex = "<span class=\"level1\">" + h1c + ". </span>";
              } else if (tagName === config.level2) {
                h2c++;
                h3c = 0;
                titleIndex = "<span class=\"level2\">" + h1c + "." + h2c + ". </span>";
              } else if (tagName === config.level3) {
                h3c++;
                titleIndex = "<span class=\"level3\">" + h1c + "." + h2c + "." + h3c + ". </span>";
              }
            }

            var idx = eleIds[index];

            catalogContents += "<li class=\"li_" + tagName + "\" title=\"" + text + "\">\n                            <i class=\"" + idx + "\" ></i><a class=\"esa-anchor-link\">" + (titleIndex + titleContent) + "</a>\n                        </li>";

            $(header).attr("id", "" + idx).append("<a href=\"#" + idx + "\" class=\"esa-anchor\">#</a>").hover(function () {
              $(header).find(".esa-anchor").css("opacity", 1);
            }, function () {
              $(header).find(".esa-anchor").css("opacity", 0);
            });
          });
          catalogContents += "</ul>";

          $catalog.find(".esa-catalog-contents").append(catalogContents);
          $catalog.appendTo("body");

          var $tabContent = $(".esa-catalog-contents");

          $tabContent.fadeIn();

          $(".esa-anchor-link").on("click", function () {
            var position = $("#" + $(this).prev("i").attr("class")).offset().top;
            $("html, body").animate({
              scrollTop: position - 70
            }, 300);
          });

          $(".esa-catalog-close").on("click", function () {
            $tabContent.hide();
          });

          if (config.move) {
            var move = {
              start: false,
              pois: [0, 0]
            };

            $(".esa-catalog-title").on("mousedown", function (e) {
              e.preventDefault();
              move.start = true;
              var position = $(".esa-catalog").position();
              var poisX = e.clientX - parseFloat(position.left);
              var poisY = e.clientY - parseFloat(position.top);
              move.pois = [poisX, poisY];
            });

            $(document).on("mousemove", function (e) {
              if (move.start) {
                var offsetX = e.clientX - move.pois[0];
                var offsetY = e.clientY - move.pois[1];
                var fixed = $(".esa-catalog").css("position") === "fixed";

                e.preventDefault();

                move.stX = fixed ? 0 : $(window).scrollLeft();
                move.stY = fixed ? 0 : $(window).scrollTop();

                var setRig = $(window).width() - $(".esa-catalog").outerWidth() + move.stX;
                var setBot = $(window).height() - $(".esa-catalog").outerHeight() + move.stY;

                offsetX < move.stX && (offsetX = move.stX);
                offsetX > setRig && (offsetX = setRig);
                offsetY < move.stY && (offsetY = move.stY);
                offsetY > setBot && (offsetY = setBot);

                $(".esa-catalog").css({
                  left: offsetX,
                  top: offsetY,
                  right: "auto"
                });
              }
            }).on("mouseup", function (_e) {
              if (move.start) {
                move.start = false;
              }
            });
          }
        }
      }

      /**
       * 构建 Github Corner
       */

    }, {
      key: "buildGithubCorner",
      value: function buildGithubCorner() {
        var config = this.defaluts.github;
        if (config.enable) {
          var fillStyle = config.fill ? "fill:" + config.fill + ";" : "";
          $("body").append("<a href=\"" + config.link + "\" class=\"github-corner\" title=\"Fork me on GitHub\">\n                        <svg width=\"60\" height=\"60\" viewBox=\"0 0 250 250\" style=\"" + fillStyle + " color:" + config.color + "; z-index: 999; position: fixed; top: 0; border: 0; left: 0; transform: scale(-1, 1);\" aria-hidden=\"true\">\n                            <path d=\"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z\"></path>\n                            <path d=\"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2\" fill=\"currentColor\" style=\"transform-origin: 130px 106px;\" class=\"octo-arm\"></path>\n                            <path d=\"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z\" fill=\"currentColor\" class=\"octo-body\"></path>\n                        </svg>\n                    </a>");
        }
      }

      /**
       * 构建代码复制按钮
       */

    }, {
      key: "buildPostCodeCopyBtns",
      value: function buildPostCodeCopyBtns() {
        var _this3 = this;

        var $pres = $(".postBody .cnblogs-markdown").find("pre");
        if (!$pres.length) {
          return false;
        }
        $.each($pres, function (index, pre) {
          $(pre).find("code").attr("id", "copy_target_" + index);
          $(pre).prepend("<div data-tips=\"\u590D\u5236\u4EE3\u7801\" class=\"esa-clipboard-button\" data-clipboard-target=\"#copy_target_" + index + "\">Copy</div>");
        });
        $.getScript(CDN.clipboard.js, function () {
          var clipboard = new ClipboardJS(".esa-clipboard-button");
          clipboard.on("success", function (e) {
            _this3.showMessage("代码已复制");
            e.clearSelection();
          });
          clipboard.on("error", function (e) {
            _this3.showMessage("代码复制失败");
          });
        });
      }

      /**
       * 构建工具栏
       */

    }, {
      key: "buildToolbar",
      value: function buildToolbar() {
        var _this4 = this;

        var catalog = this.defaluts.catalog;

        $("body").append("<div class=\"esa-toolbar\">\n                <button class=\"esa-toolbar-gotop\" data-tips=\"\u8FD4\u56DE\u9876\u90E8\"></button>\n                <button class=\"esa-toolbar-contents\" data-tips=\"\u9605\u8BFB\u76EE\u5F55\"></button>\n                <button class=\"esa-toolbar-follow\" data-tips=\"\u5173\u6CE8\u535A\u4E3B\"></button>\n            </div>");

        var $btnGotop = $(".esa-toolbar-gotop");
        var $btnContents = $(".esa-toolbar-contents");
        var $btnFollow = $(".esa-toolbar-follow");

        if (catalog.enable) {
          $btnContents.on("click", function () {
            var $catalog = $(".esa-catalog-contents");
            if ($catalog.css("display") == "none") {
              $catalog.fadeIn();
            } else {
              $catalog.hide();
            }
          });
        } else {
          $btnContents.remove();
        }

        $btnGotop.on("click", function () {
          $(window).scrollTop(0);
        });

        $(window).scroll(function () {
          if (this.scrollY > 200) {
            $btnGotop.fadeIn();
          } else {
            $btnGotop.fadeOut();
          }
        });

        $btnFollow.on("click", function () {
          loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", function () {
            loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", function () {
              if (!isLogined) {
                return login();
              }
              if (c_has_follwed) {
                return _this4.showMessage("您已经关注过该博主啦");
              }
              var n = cb_blogUserGuid;
              $.ajax({
                url: getAjaxBaseUrl() + "Follow/FollowBlogger.aspx",
                data: '{"blogUserGuid":"' + n + '"}',
                dataType: "text",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function success(msg) {
                  msg == "未登录" ? login() : msg == "关注成功，请选择分组" && followByGroup(n, !0);
                  _this4.showMessage(msg);
                }
              });
            });
          });
        });
      }

      /**
       * 构建博客基础信息
       */

    }, {
      key: "buildBloggerProfile",
      value: function buildBloggerProfile() {
        var base = this.defaluts.base;

        if (!this.isPostPage && base.avatar) {
          $(this.cnblogs.sideBarMain).prepend("<img class=\"esa-profile-avatar\" src=\"" + base.avatar + "\" />");
        }
        if (base.favicon) {
          $("head").append("<link rel=\"shortcut icon\" href=\"" + base.favicon + "\" type=\"image/x-icon\" />");
        }
      }

      /**
       * 构建博文图片灯箱
       */

    }, {
      key: "buildPostLightbox",
      value: function buildPostLightbox() {
        var _this5 = this;

        $("head").append("<link rel=\"stylesheet\" href=\"" + CDN.lightbox.css + "\"/>");
        $.getScript(CDN.lightbox.js, function () {
          $(_this5.cnblogs.postBody).find("img").wrap(function () {
            var src = $(this).attr("src");
            var title = $(this).attr("title") || "";
            var alt = $(this).attr("alt") || "";
            return "<a href=\"" + src + "\" data-title=\"" + title + "\" data-alt=\"" + alt + "\" data-lightbox=\"roadtrip\"></a>";
          });
          $(".code_img_closed, .code_img_opened, .cnblogs_code_copy img").unwrap();
        });
      }
    }, {
      key: "cnblogs",
      get: function get() {
        return {
          header: "#header",
          blogTitle: "#blogTitle",
          publicProfile: "#profile_block",
          navigator: "#navigator",
          navList: "#navList",
          sideBar: "#sideBar",
          sideBarMain: "#sideBarMain",
          forFlow: ".forFlow",
          postTitle: "#cb_post_title_url",
          postDetail: "#post_detail",
          postBody: "#cnblogs_post_body",
          postDigg: "#div_digg",
          postCommentBody: ".blog_comment_body",
          feedbackContent: ".feedbackCon",
          postSignature: "#MySignature",
          footer: "#footer"
        };
      }
    }, {
      key: "isPostPage",
      get: function get() {
        return $(this.cnblogs.postDetail).length > 0;
      }
    }]);

    return Silence;
  }();
})(jQuery);
