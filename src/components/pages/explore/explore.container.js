import { connect } from 'react-redux';

import { exploreSeries } from '../../../store/explore';
import Explore from './explore.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  exploreSeries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
