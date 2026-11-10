import Icon from "@/components/ui/Icon";
import { PROCESS_LOGS } from "@/infrastructure/mockData";

export default function ProcessLogsView() {
  return <main className="page"><div className="page-header"><div><h1>Process Logs</h1><p>Read-only sanitized mock logs for Super Admin and Maintainer. No application log or secret is loaded.</p></div><span className="permission-badge allowed">READ ONLY</span></div><div className="notice info" style={{ marginBottom: 12 }}><Icon name="shield" /><span>Entries are authored synthetic examples. Environment values, tokens, URLs, and production traces are intentionally absent.</span></div><section className="card"><div className="card-head"><div><h2>Recent mock events</h2><p>Local static dataset</p></div><span className="muted">{PROCESS_LOGS.length} rows</span></div><div className="table-wrap"><table><thead><tr><th>Time</th><th>Level</th><th>Source</th><th>Message</th></tr></thead><tbody>{PROCESS_LOGS.map((log,index) => <tr key={`${log.time}-${index}`}><td className="tabular">{log.time}</td><td><span className="log-level">{log.level}</span></td><td>{log.source}</td><td>{log.message}</td></tr>)}</tbody></table></div></section></main>;
}
