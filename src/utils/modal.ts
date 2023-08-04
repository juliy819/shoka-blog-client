/**
 * 模态框
 */
interface Modal {
  /**
   * 提示消息
   */
  msgInfo(message: string): void;

  /**
   * 错误消息
   */
  msgError(message: string): void;

  /**
   * 成功消息
   */
  msgSuccess(message: string): void;

  /**
   * 警告消息
   */
  msgWarning(message: string): void;

  /**
   * 信息提示
   */
  notifyInfo(message: string): void;

  /**
   * 错误提示
   */
  notifyError(message: string): void;

  /**
   * 成功提示
   */
  notifySuccess(message: string): void;

  /**
   * 警告提示
   */
  notifyWarning(message: string): void;
}

export const modal: Modal = {

  msgInfo: (message) => {
    window.$message?.info(message);
  },

  msgError: (message) => {
    window.$message?.error(message);
  },

  msgSuccess: (message) => {
    window.$message?.success(message);
  },

  msgWarning: (message) => {
    window.$message?.warning(message);
  },

  notifyInfo: (message) => {
    window.$notification?.info({
      title: '提示',
      content: message
    });
  },

  notifyError: (message) => {
    window.$notification?.error({
      title: '错误',
      content: message
    });
  },

  notifySuccess: (message) => {
    window.$notification?.success({
      title: '成功',
      content: message
    });
  },

  notifyWarning: (message) => {
    window.$notification?.warning({
      title: '警告',
      content: message
    });
  }
};