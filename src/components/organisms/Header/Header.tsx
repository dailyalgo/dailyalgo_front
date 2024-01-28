import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Header.module.scss";

const cx = classNames.bind(style);

// interface Props {}

const Header = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alarmBoxVisible, setAlarmBoxVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };
  const handleFocus = () => {
    if (value !== "") {
      setVisible(() => true);
    }
  };

  const handleAlarmButton = () => {
    console.log("alarm close");
    setAlarmBoxVisible(!alarmBoxVisible);
    // setAlarmBoxVisible(true);
  };

  useEffect(() => {
    if (value) {
      setVisible(() => true);
    } else {
      setVisible(() => false);
    }
  }, [value]);

  const handlePreviewOffByClick = () => {
    setVisible(() => false);
  };

  const handleAlarmOffByClick = () => {
    setAlarmBoxVisible(false);
  };

  return (
    <div className={cx("header-wrap")}>
      <div className={cx("contents")}>
        <Link href="/">
          <button className={cx("logo")} type="button">
            <span>DailyAlgo</span>
          </button>
        </Link>
        <div className={cx("search-bar-wrap")}>
          {visible && (
            <button
              type="button"
              className={cx("modal-wrapper")}
              onClick={handlePreviewOffByClick}
              id="search-modal-wrapper-handler"
            >
              <span className={cx("sr-only")}>close</span>
            </button>
          )}
          <div className={cx("search-bar")}>
            <img src="/images/search.svg" alt="search" />
            <input
              type="text"
              placeholder="태그 혹은 문제이름을 검색해 보세요."
              value={value}
              onFocus={handleFocus}
              onChange={handleChange}
            />
          </div>
          {visible && (
            <div className={cx("search-preview-wrap")}>
              <div className={cx("search-result")}>
                <div className={cx("tags")}>태그</div>
                <div className={cx("problems")}>문제</div>
              </div>
              <div className={cx("actions")}>
                {/* <button className={cx("question-button")} type="button">
                  <span>질문하기</span>
                </button> */}
                <button type="button" onClick={() => setVisible(false)}>
                  <span>닫기</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={cx("side-actions")}>
          {isLoggedIn ? (
            <button className={cx("login-button")} type="button">
              <span>로그인</span>
            </button>
          ) : (
            <div>
              <button className={cx("question-button")} type="button">
                <span>작성하기</span>
              </button>
              <div className={cx("alarm-wrap")}>
                {alarmBoxVisible && (
                  <button
                    type="button"
                    className={cx("modal-wrapper")}
                    onClick={handleAlarmOffByClick}
                    id="alarm-modal-wrapper-handler"
                  >
                    <span className={cx("sr-only")}>close</span>
                  </button>
                )}
                <button className={cx("alarm-button")} type="button" onClick={handleAlarmButton}>
                  <img src="/images/alarm.svg" alt="alarm" />
                  <div className={cx("active")} />
                </button>
                {/* alarmlist비어있는 경우 */}
                {/* {alarmBoxVisible && (
                  <div className={cx("alarm-box-wrap")}>
                    <img src="/images/brandLogo.png" alt="default" />
                    <span className={cx("title")}>아직 알림이 없습니다.</span>
                    <span className={cx("description")}>
                      게시글을 작성하고 다양한 피드백을 받아보세요!
                    </span>
                  </div>
                )} */}
                {/* alarmList 존재하는 경우 */}
                {alarmBoxVisible && (
                  <div className={cx("alarm-box-wrap")}>
                    <div className={cx("top-side-wrap")}>
                      <button type="button" className={cx("read-button")}>
                        <span>모두 읽음</span>
                      </button>
                    </div>
                    <div className={cx("item-list-wrap")}>
                      <div className={cx("item")}>
                        <div className={cx("left-side-contents")}>
                          <div className={cx("profile-img-wrap")}>
                            <img src="/images/brandLogo.png" alt="default" />
                          </div>
                        </div>
                        <div className={cx("right-side-contents")}>
                          <div>title</div>
                          <p>des...</p>
                          <p>time</p>
                        </div>
                      </div>
                      <div className={cx("item")}>
                        <div className={cx("left-side-contents")}>
                          <div className={cx("profile-img-wrap")}>
                            <img src="/images/brandLogo.png" alt="default" />
                          </div>
                        </div>
                        <div className={cx("right-side-contents")}>
                          <div>title</div>
                          <p>des...</p>
                          <p>time</p>
                        </div>
                      </div>
                      <div className={cx("item")}>
                        <div className={cx("left-side-contents")}>
                          <div className={cx("profile-img-wrap")}>
                            <img src="/images/brandLogo.png" alt="default" />
                          </div>
                        </div>
                        <div className={cx("right-side-contents")}>
                          <div>title</div>
                          <p>des...</p>
                          <p>time</p>
                        </div>
                      </div>
                    </div>
                    <div className={cx("bottom-side-wrap")}>
                      <button type="button" className={cx("va-button")}>
                        <span>알림 전체보기</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button className={cx("profile-button")} type="button">
                <img src="/images/profile.svg" alt="profile" />
              </button>
            </div>
          )}
        </div>
      </div>
      <button type="button" onClick={() => setIsLoggedIn(!isLoggedIn)} style={{ marginTop: 50 }}>
        <span>로그인변경</span>
      </button>
    </div>
  );
};

export { Header };
