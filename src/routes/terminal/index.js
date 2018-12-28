import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectStyle from 'react-jss'
import Container from '../../components/Container'
import Header from './TerminalHeader'
import TerminalOutput from './TerminalOutput'


class TerminalPage extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  state = {
    history: []
  };

  componentDidMount() {
    window.isPageLoaded = true;
  }

  render() {
    const { classes, className } = this.props;
    return (
      <div className={classNames(classes.wrapper, className)}>
        <Container type="content">
          <Header
            notFoundTitle="Oops, 404!"
            title="Nikita Trifan"
          />
          <TerminalOutput />
        </Container>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#000',
    minHeight: '100vh',
    paddingBottom: '70px',
    width: '100%',
    overflowX: 'hidden'
  }
};

export default injectStyle(styles)(TerminalPage)
