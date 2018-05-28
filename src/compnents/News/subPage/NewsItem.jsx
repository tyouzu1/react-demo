import React from 'react'
import LazyLoad from 'react-lazyload';
import {hashHistory} from 'react-router'
import LocalStore from '../../../util/localStore'
import { CHOSEN_READED_IDS } from '../../../config/localStoreKey'
import './style.less'


const Bottom = ({site, type}) => (
    <div className="item-bottom">
        <div className="item-time">
            <b className="tip-time">{site}</b>
            {
                type === "hot"
                    ? <b className="tip-hot">热点</b> : type === "ads"
                    ? <b className="tip-time">广告</b> : type === "recommend"
                        ? <b className="tip-hot">猜你喜欢</b> : null
            }
        </div>
    </div>
);

class NewsItem extends React.Component {

    handleClick(){
       let local = LocalStore.getItem(CHOSEN_READED_IDS);
       let id = this.props.data.nid;
        let newLocal ;
       if (local){
           newLocal = JSON.parse(local);
           newLocal.push(id);
       }else {
           newLocal = [];
           newLocal.push(id);
       }
        LocalStore.setItem(CHOSEN_READED_IDS,JSON.stringify(newLocal));
        hashHistory.push('/detail/'+id)
    }

    render() {
        let id = JSON.parse(LocalStore.getItem(CHOSEN_READED_IDS))||[];
        if (!this.props.imageMode) {
            return (
                <div className="news-list-item-container" onClick={()=>this.handleClick()}>
                    <div className={"news-list-item"+(id.includes(this.props.data.nid)?' read':'')}>
                        <div className="item-main">
                            <div className="item-text">
                                <p>{this.props.data.title}</p>
                                <Bottom site={this.props.data.site} type={this.props.data.type}/>
                            </div>
                        </div>
                    </div>
                </div>

            )
        } else {
            const images = this.props.data.imageurls;
            return (
                <div className="news-list-item-container" onClick={()=>this.handleClick()}>
                    <div className={"news-list-item"+(id.includes(this.props.data.nid)?' read':'')}>
                        {
                            !images.length ? <div className="item-main">
                                    <div className="item-text">
                                        <p>{this.props.data.title}</p>
                                        <Bottom site={this.props.data.site} type={this.props.data.type}/>
                                    </div>
                                </div>
                                : images.length === 1
                                ? <div className="item-main show">
                                    <div className="item-image">

                                        <LazyLoad once debounce
                                                  placeholder={<img
                                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAACWCAMAAADwiHQPAAAAV1BMVEXw8PAAAAA2h842AADwzofwq2DOhzYAAGCr8PDO8PAANoeHNgDw8M4AYKtgq/Dw8KtgAACrYAAAADaHzvDO8M4AYKxgNoeHzs42YKtgh4erq2DOh2A2Nja1e1gnAAAC0UlEQVR42u2a63KbMBQGOSQitTG02E3v7/+ctVDjnUEM0pii4My3P5wYCems7pBUQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQIo/Guuojc2rNjoeFDM9P9vIpu7Gsvn0Z7Hyp3p9r/NZX2wmeWq6sZ7AE9BYxEf8GggyQ4oKM0K7aUPC3XekLCzrLoU8LIjbBuzX+Y7w/0YZrl5BoDqwSDAFDvSBo/VsMDJzHFJwboqPgbWD9KCaYvcTEHePz3iVYNVEMhQQ/f2F65AvSJm5J0CEIhQUbP1k2FIyrLicYd2DDF0DI554THK/ksN6WqPukIB2YJRh+eTRBOjAheDw8puBAB64SpLLJfhKVV0aQAEhbJUjOscEI5J0ESSLSBUFnCB4PS4JDKIBAwo0bC8YTAR/yrRckgbrfBBtECwgSDg28UtBZzPlyan1GIioqyAl4sDlw8N6v1T2Ct0f6xtdUdg6OXvmCXUIwGqAcRgmorKCztCBNUScEyeaiwygdWEiQR57UHKSEnsk4I0hivOp0xFNGkCz282lZkLzny6IglXKBfYLNo4ggC0z9nCeIj/Pp84LBYio4LqPs/uUEnflw0oL0W0LQ1zmlG7XP3wmg4BAdfPVpQfrmTsGGmV54Dn475AlSGumxIMSHU87zRQQhV9ARYa7gdLJXuxYcGGK5ghxDTy0T+HjYpaAvrCa9TgpOFhkLecPNexRsDJvhJgjhUmMxr8HP2Ef6HQp6ma5KCjqL6UbtP6GBwpa4Q0FealBuLMill19UN/jEsf7VD79EmEWN4Nd2IV8fTgQ0VZBNLzIsoMG9/3cs3Z3gNYd3ObUMuwxBdv6aV5N+eO9PcPAflOsDzREMP/jLCzcXgzmYei3esfZ7rSxBhjOGWR1YUpAjXS4Isq9T0wf/Tw4hhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQvwX/gKrNyn8jzGr3gAAAABJRU5ErkJggg=="
                                                      style={{
                                                          height: 'auto',
                                                          width: '100%',
                                                          verticalAlign: 'middle'
                                                      }}
                                                  />}>
                                            <img src={images[0].url_webp || images[0].url}/>
                                        </LazyLoad>
                                    </div>

                                    <div className="item-text">
                                        <p>{this.props.data.title}</p>
                                        <Bottom site={this.props.data.site} type={this.props.data.type}/>
                                    </div>
                                </div>
                                : <div className="item-main">
                                    <div className="item-text">
                                        <p>{this.props.data.title}</p>
                                    </div>
                                    <div className="item-image-container">
                                        {
                                            images.map((item, index) =>
                                                <div className="item-image-list" key={index}>
                                                    <div className="item-image-list-wrapper">
                                                        <LazyLoad key={index} once debounce
                                                                  placeholder={<img
                                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAACWCAMAAADwiHQPAAAAV1BMVEXw8PAAAAA2h842AADwzofwq2DOhzYAAGCr8PDO8PAANoeHNgDw8M4AYKtgq/Dw8KtgAACrYAAAADaHzvDO8M4AYKxgNoeHzs42YKtgh4erq2DOh2A2Nja1e1gnAAAC0UlEQVR42u2a63KbMBQGOSQitTG02E3v7/+ctVDjnUEM0pii4My3P5wYCems7pBUQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQIo/Guuojc2rNjoeFDM9P9vIpu7Gsvn0Z7Hyp3p9r/NZX2wmeWq6sZ7AE9BYxEf8GggyQ4oKM0K7aUPC3XekLCzrLoU8LIjbBuzX+Y7w/0YZrl5BoDqwSDAFDvSBo/VsMDJzHFJwboqPgbWD9KCaYvcTEHePz3iVYNVEMhQQ/f2F65AvSJm5J0CEIhQUbP1k2FIyrLicYd2DDF0DI554THK/ksN6WqPukIB2YJRh+eTRBOjAheDw8puBAB64SpLLJfhKVV0aQAEhbJUjOscEI5J0ESSLSBUFnCB4PS4JDKIBAwo0bC8YTAR/yrRckgbrfBBtECwgSDg28UtBZzPlyan1GIioqyAl4sDlw8N6v1T2Ct0f6xtdUdg6OXvmCXUIwGqAcRgmorKCztCBNUScEyeaiwygdWEiQR57UHKSEnsk4I0hivOp0xFNGkCz282lZkLzny6IglXKBfYLNo4ggC0z9nCeIj/Pp84LBYio4LqPs/uUEnflw0oL0W0LQ1zmlG7XP3wmg4BAdfPVpQfrmTsGGmV54Dn475AlSGumxIMSHU87zRQQhV9ARYa7gdLJXuxYcGGK5ghxDTy0T+HjYpaAvrCa9TgpOFhkLecPNexRsDJvhJgjhUmMxr8HP2Ef6HQp6ma5KCjqL6UbtP6GBwpa4Q0FealBuLMill19UN/jEsf7VD79EmEWN4Nd2IV8fTgQ0VZBNLzIsoMG9/3cs3Z3gNYd3ObUMuwxBdv6aV5N+eO9PcPAflOsDzREMP/jLCzcXgzmYei3esfZ7rSxBhjOGWR1YUpAjXS4Isq9T0wf/Tw4hhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQvwX/gKrNyn8jzGr3gAAAABJRU5ErkJggg=="
                                                                    style={{
                                                                          height: 'auto',
                                                                          width: '100%',
                                                                          verticalAlign: 'middle'
                                                                      }}
                                                                  />}>
                                                            <img src={item.url_webp || item.url}/>
                                                        </LazyLoad>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <Bottom site={this.props.data.site} type={this.props.data.type}/>
                                </div>
                        }


                    </div>
                </div>
            )
        }

    }
}

export default NewsItem;
// module.exports =NewsItem;
