import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "ati-ui-react/components/Button";

import { mapClassNamesAndJoin, joinNotEmptyClassNames } from "ati-ui-react/utils/styles";
import animate from "ati-ui-react/utils/animate";


import styles from "./Popup.scss";

class Popup extends PureComponent {
  scrollingTop = false;
  scrollPosition = { x: 0, y: 0 };

  // Nodes
  warningContainer = React.createRef();
  core = React.createRef();
  container = React.createRef();

  componentDidMount() {
    if (!this.props.ignoreBodyOverflow) {
      document.body.style.overflow = "hidden";
    }

    if (this.props.fixedBodyPosition) {
      this.props.restorePosition &&
        (this.scrollPosition = { x: window.pageXOffset, y: window.pageYOffset });
      document.body.style.position = "fixed";
    }

    document.addEventListener("mousedown", this.outerClick);
    document.addEventListener("keyup", this.outerClick);
  }

  componentDidUpdate() {
    this.handleScrollToWarning();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.outerClick);
    document.removeEventListener("keyup", this.outerClick);

    if (!this.props.ignoreBodyOverflow) {
      document.body.style.overflow = "";
    }

    if (this.props.fixedBodyPosition) {
      document.body.style.position = "";
      this.props.restorePosition && window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
    }
  }

  outerClick = (event) => {
    const target = event.target;
    const core = this.core.current;
    const container = this.container.current;

    const closeOnOverlayClick = event.type === "mousedown"
      && this.props.closeOnOverlayClick
      && (target === container || target === core);
    const closeOnEsc = event.type === "keyup"
      && this.props.closeOnEscape
      && event.which === 27;

    if (closeOnOverlayClick || closeOnEsc) {
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.onClose(this.props.id);
  };

  handleWarningOverlayClick = () => {
    if (this.props.closeOnOverlayClick !== false) this.handleClose();
  };

  renderFooter = () => {
    const {
      primaryAction,
      alternateAction,
      whiteActionArea,
      isPrimaryActionLoading,
      footer,
      footerClassName,
    } = this.props;

    return (primaryAction || alternateAction || footer) && (
      <div
        className={joinNotEmptyClassNames(
          styles["ati-core-popup-actions"],
          whiteActionArea && styles["ati-core-popup-actions--white"],
          footerClassName,
        )}
      >
        {footer}

        {!footer &&
          <div className={styles["ati-core-popup-main-action"]}>
            <Button
              onClick={primaryAction.action}
              className={styles["ati-core-popup-button"]}
              isLoading={isPrimaryActionLoading}
              mobile
              disabled={primaryAction.disabled}
            >
              {primaryAction.name}
            </Button>
          </div>
        }

        {alternateAction && !footer &&
          <div
            className={
              mapClassNamesAndJoin(
                styles,
                "ati-core-popup-alternate-action",
                alternateAction.disabled && "disabled",
              )
            }
          >
            <span
              className={styles["action-link"]}
              onClick={alternateAction.action}
              role="button"
              tabIndex={-1}
            >
              {alternateAction.name}
            </span>
          </div>
        }
      </div>
    );
  }

  handleScrollToWarning = () => {
    const { showWarning, warningComponent } = this.props;
    const core = this.core.current;
    const warningContainer = this.warningContainer.current;
    const scrollCheck = warningContainer && core.scrollTop > warningContainer.offsetHeight;

    if (showWarning && warningComponent && scrollCheck && !this.scrollingTop) {
      this.scrollingTop = true;

      animate({
        from: core.scrollTop,
        to: 0,
        duration: 200,
        progress: (position) => {
          core.scrollTop = position;
        },
        onCompleted: () => {
          this.scrollingTop = false;
        },
      });
    }
  }

  render() {
    const {
      title,
      children,
      warningComponent,
      showWarning,
      small,
      contentClassName,
      className,
      noBackdrop,
      whiteActionArea,
      hideCloseButton,
      showConfirmation,
      confirmationComponent,
      dataName,
      coreClassName,
      isAdaptive,
    } = this.props;

    return (
      <div
        className={[
          styles["popup-container"],
          className || "",
          noBackdrop && styles["no-backdrop"],
          isAdaptive && styles["mobileAdaptive"],
        ].filter(Boolean).join(" ")}
        ref={this.container}
        data-name={dataName}
      >
        <div
          className={styles["ati-core-popup"]}
          ref={this.core}
        >
          <div
            className={[
              styles["ati-core-popup-content"],
              small ? styles["ati-core-popup-content--small"] : "",
              contentClassName || "",
            ].filter(Boolean).join(" ")}
          >
            {showWarning && !!warningComponent &&
              <React.Fragment>
                <div
                  role="presentation"
                  className={styles["warning-overlay"]}
                  onClick={this.handleWarningOverlayClick}
                />

                <div className={styles["warning-wrapper"]}>
                  <div
                    className={styles["warning-container"]}
                    ref={this.warningContainer}
                  >
                    {warningComponent}
                  </div>
                </div>
              </React.Fragment>
            }

            {!hideCloseButton &&
              <button className={styles["ati-core-close-button"]} onClick={this.handleClose} />
            }

            <div
              className={[
                styles["ati-core-text-content"],
                whiteActionArea ? styles["ati-core-text-content--white"] : "",
                coreClassName || "",
              ].join(" ")}
            >
              {!!title && <div className={styles["ati-core-popup-header"]}>{title}</div>}
              {children}
            </div>

            {(showConfirmation && !!confirmationComponent) ? (
              <div className={styles["confirmation-component-wrapper"]}>
                {confirmationComponent}
              </div>
            ) :
              this.renderFooter()
            }
          </div>
        </div>
      </div>
    );
  }
}


Popup.defaultProps = {
  whiteActionArea: false,
  small: false,
  showWarning: false,
  confirmationComponent: false,
  isAdaptive: true,
};

Popup.propTypes = {
  /** id */
  id: PropTypes.string,
  /** Заголовок попапа */
  title: PropTypes.string,
  /** callback на закрытие попапа */
  onClose: PropTypes.func.isRequired,
  /** флаг, закрыть ли попап на клик вне области попапа */
  closeOnOverlayClick: PropTypes.bool,
  /** флаг, закрыть ли попап по нажатию на клавижу 'escape' */
  closeOnEscape: PropTypes.bool,
  /** children-элемент */
  children: PropTypes.node,
  /** класс, присваиваемый компоненту попапа */
  className: PropTypes.string,
  /** класс, присваиваемый контенту попапа */
  contentClassName: PropTypes.string,
  noBackdrop: PropTypes.bool,
  /** флаг, назначить ли футеру с action-кнопками белый фон */
  whiteActionArea: PropTypes.bool,
  /** флаг, скрыть ли кнопку закрытия попапа */
  hideCloseButton: PropTypes.bool,
  /** основное действие в попапе
   * name - название действия, текст в кнопке
   * action - коллбэк на нажатие кнопки основного действия
   * disabled - флаг, задизейблена ли кнопка основного действия
   */
  primaryAction: PropTypes.shape({
    name: PropTypes.string,
    action: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  /** дополнительное действие в попапе
   * name - название действия, текст в кнопке
   * action - коллбэк на нажатие кнопки дополнительного действия
   * disabled - флаг, задизейблена ли кнопка дополнительного действия
   */
  alternateAction: PropTypes.shape({
    name: PropTypes.string,
    action: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  /** флаг, задать ли маленький размер */
  small: PropTypes.bool,
  /** флаг для отрисовки прелоудера в кнопке главного действия попапа */
  isPrimaryActionLoading: PropTypes.bool,
  /** флаг, если установлен в true, до для body документа устанавливается
   * свойство overflow: hidden, скролл попапа
   */
  ignoreBodyOverflow: PropTypes.bool,
  /** Установить position: "fixed" для body.
   * Полезно для мобильных устройств, чтобы экран не прыгал */
  fixedBodyPosition: PropTypes.bool,
  /**
   * Provides custom footer content - valid React component
   * Discards primaryAction and alternateAction
   */
  footer: PropTypes.node,
  /** класс, для контента футера попапа */
  footerClassName: PropTypes.string,
  /** компонент, который показывается в качестве предупреждения в попапе */
  warningComponent: PropTypes.node,
  /** флаг, показать ли предупреждение в попапе */
  showWarning: PropTypes.bool,
  /** Компонент, который будет показан вместо футера в качестве подтверждения */
  confirmationComponent: PropTypes.node,
  /** Флаг, показать ли подтверждение вместо футера в попапе */
  showConfirmation: PropTypes.bool,
  /** data-name для контейнера */
  dataName: PropTypes.string,
  /** класс, для внутреннего контента попапа */
  coreClassName: PropTypes.string,
  /** флаг, если true - восстанавливаем исходную позицию на странице
   * после блокировки скролла в адаптиве */
  restorePosition: PropTypes.bool,
  /* отключение адаптивности компонента, по умолчанию, включена, то есть true */
  isAdaptive: PropTypes.bool,
};

export default Popup;
