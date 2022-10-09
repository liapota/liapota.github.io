import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";

import Button from "ati-ui-react/components/Button";

import styles from "./ConfirmationTemplate.scss";

const cx = classnames.bind(styles);

const ConfirmationTemplate = ({
  className,
  actionsClassName,
  title,
  firstAction,
  secondAction,
  content,
}) => (
  <div className={cx("wrapper", className)}>
    {title && (
      <h3 className={cx("header")}>
        {title}
      </h3>
    )}

    {content &&
      <div className={cx("content")}>
        {content}
      </div>
    }

    {(firstAction || secondAction) && (
      <div className={cx("actions", actionsClassName)}>
        {firstAction && (
          <Button
            onClick={firstAction.action}
            className={cx("button")}
            mobile
          >
            {firstAction.text}
          </Button>
        )}
        {secondAction && (
          <Button
            primary={false}
            onClick={secondAction.action}
            className={cx("button")}
            mobile
          >
            {secondAction.text}
          </Button>
        )}
      </div>
    )}
  </div>
);

ConfirmationTemplate.propTypes = {
  /** класс для блока действий */
  actionsClassName: PropTypes.string,
  /** className для обертки */
  className: PropTypes.string,
  /** заголовок */
  title: PropTypes.string,
  /** основной контент */
  content: PropTypes.node,
  /** основное действие в предупреждении:
   * text - название действия, текст в кнопке
   * action - callback нажатия на кнопку
   */
  firstAction: PropTypes.shape({
    text: PropTypes.string,
    action: PropTypes.func,
  }),
  /** второе действие в предупреждении:
   * text - название действия, текст в кнопке
   * action - callback нажатия на кнопку
   */
  secondAction: PropTypes.shape({
    text: PropTypes.string,
    action: PropTypes.func,
  }),
};

export default ConfirmationTemplate;
