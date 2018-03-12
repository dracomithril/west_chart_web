/**
 * Created by Gryzli on 26.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Checkbox, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getFbPictureUrl } from '../../utils/utils';
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
      <span
        style={{ color: 'red' }}
        title={`creation time: ${fullFormatDate(time_value.created_time)}`}
      >
        <i className="fas fa-caret-right" /> {formatDate(time_value.created_time)}
      </span>
      <br />
      {time_value.created_time !== time_value.updated_time && (
        <span
          style={{ color: 'green' }}
          title={`update time: ${fullFormatDate(time_value.updated_time)}`}
        >
          <i className="fas fa-caret-up" /> {formatDate(time_value.updated_time)}
        </span>
      )}
    </div>
  );

  TimeCell.propTypes = {
    value: PropTypes.object,
  };
  const time = {
    Header: <i className="far fa-clock">Time</i>,
    id: 'createTime',
    resizable: true,
    minWidth: 100,
    maxWidth: 200,
    accessor: d => ({
      created_time: getTime(d.created_time),
      updated_time: getTime(d.updated_time),
    }),
    Cell: TimeCell,
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
  const link = {
    Header: (
      <i className="fas fa-external-link-square-alt" style={{ color: 'red' }} aria-hidden="true">
        Link
      </i>
    ), // Custom header components!
    accessor: d => d.link,
    minWidth: 200,
    width: 300,
    maxWidth: 400,
    id: 'yt_link',
    Cell: videoLinkCell,
  };
  const UserInfoCell = ({ value: from }) => (
    <div style={{ textAlign: 'left' }}>
      <Image style={{ float: 'left' }} src={getFbPictureUrl(from.id)} />
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
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip">{value.message}</Tooltip>}
          >
            <i
              className="fas fa-comment"
              style={{ color: 'green', cursor: 'pointer' }}
              aria-hidden="true"
            />
          </OverlayTrigger>
        ) : (
          <i className="fas fa-times-circle" style={{ color: 'red', cursor: 'no-drop' }} />
        )}
        <div>
          <i
            className="far fa-thumbs-up"
            style={{ color: 'blue' }}
            aria-hidden="true"
            title="people reactions count"
          />
          {value.reactions_num}
        </div>
      </div>
    );
  };
  ReactionCell.propTypes = {
    value: PropTypes.object,
  };
  const post_info = [
    {
      Header: (
        <i className="fas fa-user-circle" style={{ color: 'green' }} aria-hidden="true">
          user
        </i>
      ),
      resizable: true,
      minWidth: 140,
      maxWidth: 180,
      id: 'user',
      accessor: 'from',
      Cell: UserInfoCell,
    },
    {
      Header: <i className="fas fa-info-circle" style={{ color: 'blue' }} aria-hidden="true" />,
      accessor: ({ message, reactions_num }) => ({ message, reactions_num }),
      id: 'woc_f',
      maxWidth: 50,
      Cell: ReactionCell,
    },
    time,
    link,
  ];

  const SelectCell = ({ value, row, onChange }) => (
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
    onChange: PropTypes.func,
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
    ...post_info,
  ];
  const tableOptions = {
    filterable: false,
    // filtered:[{id:'woc_f'},{id:'user'}],
    resizable: false,
    pageSizeOptions: [20, 50, 100],
  };
  return (
    <ReactTable
      data={data}
      className="-striped -highlight"
      {...tableOptions}
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
