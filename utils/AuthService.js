import Router from "next/router";
import { getCurrentUser } from "../modules/auth/actions";

export const requireSignedIn = (Page, to = "/login") => {
  return class extends React.PureComponent {
    static async getInitialProps({ ctx }) {
      const { isAuthenticated } = ctx.store.getState().auth;
      if (!isAuthenticated) {
        if (!ctx.isServer) {
          Router.replace(to);
        } else {
          ctx.res.redirect(to);
        }
      } else {
        ctx.store.dispatch(getCurrentUser());
      }
      if (Page.getInitialProps) return Page.getInitialProps(ctx);
    }

    render() {
      return <Page {...this.props} />;
    }
  };
};

export const redirectIfSignedIn = (Page, to = "/") => {
  return class extends React.PureComponent {
    static async getInitialProps({ ctx }) {
      const { isAuthenticated } = ctx.store.getState().auth;
      if (isAuthenticated) {
        if (!ctx.isServer) {
          Router.replace(to);
        } else {
          ctx.res.redirect(to);
        }
      }
      if (Page.getInitialProps) return Page.getInitialProps(ctx);
    }

    render() {
      return <Page {...this.props} />;
    }
  };
};
