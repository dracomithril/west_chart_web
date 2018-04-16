/**
 * Created by Gryzli on 26.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretUp,
  faClock,
  faComment,
  faExternalLinkSquareAlt,
  faInfoCircle,
  faThumbsUp,
  faTimesCircle,
  faUserCircle,
} from '@fortawesome/fontawesome-free-solid';
import 'react-table/react-table.css';
import { Checkbox, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { action_types } from './../../reducers/action_types';
import '../components.css';
import '../../App.css';

function formatDate(date) {
  const date2 = new Date(date);
  const yearNow = new Date().getFullYear();
  const options = {
    day: 'numeric',
    month: 'numeric',
  };
  if (yearNow === date2.getFullYear()) {
    return date2.toLocaleString('pl-PL', options);
  }
  return date2.toLocaleString('pl-PL', { year: 'numeric', ...options });
}

function fullFormatDate(date) {
  const date2 = new Date(date);
  const yearNow = new Date().getFullYear();
  const options = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  if (yearNow === date2.getFullYear()) {
    return date2.toLocaleString('pl-PL', options);
  }
  return date2.toLocaleString('pl-PL', { year: 'numeric', ...options });
}

const getTime = date => new Date(date).getTime();
const ChartTable = ({ data }, { store }) => {
  const { user, show_wait } = store.getState();
  const TimeCell = ({ value: time_value }) => (
    <div>
      <span style={{ color: 'red' }} title={`creation time: ${fullFormatDate(time_value.created_time)}`}>
        <FontAwesomeIcon icon={faCaretRight} /> {formatDate(time_value.created_time)}
      </span>
      <br />
      {time_value.created_time !== time_value.updated_time && (
        <span style={{ color: 'green' }} title={`update time: ${fullFormatDate(time_value.updated_time)}`}>
          <FontAwesomeIcon icon={faCaretUp} /> {formatDate(time_value.updated_time)}
        </span>
      )}
    </div>
  );

  TimeCell.propTypes = {
    value: PropTypes.object,
  };
  const videoLinkCell = ({ value }) =>
    value.url === undefined ? (
      <span>{value.title}</span>
    ) : (
      <a href={value.url} target="_newtab">
        {value.title}
      </a>
    );
  videoLinkCell.propTypes = {
    value: PropTypes.object,
  };
  const UserInfoCell = ({ value: from }) => (
    <div style={{ textAlign: 'left' }}>
      <Image style={{ float: 'left', height: 50 }} src={from.picture_url} />
      <div style={{ display: 'inline-grid' }}>
        <span style={{ paddingLeft: 10 }}>{from.first_name || from.name.split(' ')[0]}</span>
        <span style={{ paddingLeft: 10 }}>{from.last_name || from.name.split(' ')[1]}</span>
      </div>
    </div>
  );
  UserInfoCell.propTypes = {
    value: PropTypes.object,
  };
  const ReactionCell = ({ value }) => {
    const condition = value && value.message;
    return (
      <div>
        {condition ? (
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">{value.message}</Tooltip>}>
            <FontAwesomeIcon icon={faComment} style={{ color: 'green', cursor: 'pointer' }} />
          </OverlayTrigger>
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', cursor: 'no-drop' }} />
        )}
        <div>
          <FontAwesomeIcon icon={faThumbsUp} style={{ color: 'blue' }} title="people reactions count" />
          {value.reactions_num}
        </div>
      </div>
    );
  };
  ReactionCell.propTypes = {
    value: PropTypes.object,
  };
  const SelectCell = ({ value, row }) => (
    <Checkbox
      bsClass="chart-table__checkbox"
      checked={value}
      id={row.id}
      name="selected"
      onChange={({ target }) => {
        store.dispatch({
          type: 'TOGGLE_SELECTED',
          id: target.id,
          checked: target.checked,
        });
      }}
    />
  );
  SelectCell.propTypes = {
    value: PropTypes.object,
    row: PropTypes.object,
  };
  const columns = [
    {
      Header: 'id',
      show: false,
      accessor: 'id',
    },
    {
      sortable: false,
      resizable: false,
      Header: () => (
        <Checkbox
          bsClass="chart-table__checkbox"
          onClick={() => {
            store.dispatch({ type: action_types.TOGGLE_ALL });
          }}
        />
      ),
      width: 40,
      accessor: 'selected',
      Cell: SelectCell,
    },
    {
      Header: (
        <div>
          <FontAwesomeIcon icon={faUserCircle} style={{ color: 'green' }} />
          user
        </div>
      ),
      resizable: true,
      minWidth: 140,
      maxWidth: 180,
      id: 'user',
      accessor: 'from',
      Cell: UserInfoCell,
    },
    {
      Header: <FontAwesomeIcon icon={faInfoCircle} style={{ color: 'blue' }} />,
      accessor: ({ message, reactions_num }) => ({ message, reactions_num }),
      id: 'woc_f',
      maxWidth: 50,
      Cell: ReactionCell,
    },
    {
      Header: (
        <div>
          <FontAwesomeIcon icon={faClock} />Time
        </div>
      ),
      id: 'createTime',
      resizable: true,
      minWidth: 100,
      maxWidth: 200,
      accessor: d => ({
        created_time: getTime(d.created_time),
        updated_time: getTime(d.updated_time),
      }),
      Cell: TimeCell,
    },
    {
      Header: (
        <div>
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{ color: 'red' }} />
          Link
        </div>
      ), // Custom header components!
      accessor: d => d.link,
      minWidth: 200,
      id: 'yt_link',
      Cell: videoLinkCell,
    },
  ];
  return (
    <ReactTable
      data={data}
      className="-striped -highlight chart-table"
      filterable={false}
      resizable={false}
      pageSizeOptions={[20, 50, 100]}
      columns={columns}
      defaultPageSize={20}
      minRows={10}
      loading={show_wait}
      noDataText={
        <span>
          {`Hi, ${user.first_name} please click `}
          <strong style={{ color: 'blue' }}>Update</strong>
          {` to start.`}
        </span>
      }
    />
  );
};

ChartTable.contextTypes = {
  store: PropTypes.object,
};
ChartTable.propTypes = {
  data: PropTypes.array,
};
export default ChartTable;
