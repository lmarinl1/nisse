import type { SVGProps } from "react";
import { Icon, type IconSize } from "./Icon";

type NamedIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  title?: string;
  size?: IconSize;
};

export function AgentIcon(props: NamedIconProps) {
  return <Icon name="agent" {...props} />;
}

export function AiSparkIcon(props: NamedIconProps) {
  return <Icon name="ai-spark" {...props} />;
}

export function ArrowLeftIcon(props: NamedIconProps) {
  return <Icon name="arrow-left" {...props} />;
}

export function ArrowRightIcon(props: NamedIconProps) {
  return <Icon name="arrow-right" {...props} />;
}

export function BellIcon(props: NamedIconProps) {
  return <Icon name="bell" {...props} />;
}

export function CalendarIcon(props: NamedIconProps) {
  return <Icon name="calendar" {...props} />;
}

export function CandidatesIcon(props: NamedIconProps) {
  return <Icon name="candidates" {...props} />;
}

export function ChatIcon(props: NamedIconProps) {
  return <Icon name="chat" {...props} />;
}

export function CheckIcon(props: NamedIconProps) {
  return <Icon name="check" {...props} />;
}

export function ChevronDownIcon(props: NamedIconProps) {
  return <Icon name="chevron-down" {...props} />;
}

export function CloseIcon(props: NamedIconProps) {
  return <Icon name="close" {...props} />;
}

export function DecisionIcon(props: NamedIconProps) {
  return <Icon name="decision" {...props} />;
}

export function DocumentIcon(props: NamedIconProps) {
  return <Icon name="document" {...props} />;
}

export function DownloadIcon(props: NamedIconProps) {
  return <Icon name="download" {...props} />;
}

export function ExpandIcon(props: NamedIconProps) {
  return <Icon name="expand" {...props} />;
}

export function EyeIcon(props: NamedIconProps) {
  return <Icon name="eye" {...props} />;
}

export function FilterIcon(props: NamedIconProps) {
  return <Icon name="filter" {...props} />;
}

export function FolderIcon(props: NamedIconProps) {
  return <Icon name="folder" {...props} />;
}

export function GraphIcon(props: NamedIconProps) {
  return <Icon name="graph" {...props} />;
}

export function HomeIcon(props: NamedIconProps) {
  return <Icon name="home" {...props} />;
}

export function LegalIcon(props: NamedIconProps) {
  return <Icon name="legal" {...props} />;
}

export function LockIcon(props: NamedIconProps) {
  return <Icon name="lock" {...props} />;
}

export function LogoutIcon(props: NamedIconProps) {
  return <Icon name="logout" {...props} />;
}

export function MinusIcon(props: NamedIconProps) {
  return <Icon name="minus" {...props} />;
}

export function MoreIcon(props: NamedIconProps) {
  return <Icon name="more" {...props} />;
}

export function OrganizationIcon(props: NamedIconProps) {
  return <Icon name="organization" {...props} />;
}

export function PlusIcon(props: NamedIconProps) {
  return <Icon name="plus" {...props} />;
}

export function QuestionIcon(props: NamedIconProps) {
  return <Icon name="question" {...props} />;
}

export function SecurityIcon(props: NamedIconProps) {
  return <Icon name="security" {...props} />;
}

export function SendIcon(props: NamedIconProps) {
  return <Icon name="send" {...props} />;
}

export function SettingsIcon(props: NamedIconProps) {
  return <Icon name="settings" {...props} />;
}

export function ShareIcon(props: NamedIconProps) {
  return <Icon name="share" {...props} />;
}

export function ShieldIcon(props: NamedIconProps) {
  return <Icon name="shield" {...props} />;
}

export function TimelineIcon(props: NamedIconProps) {
  return <Icon name="timeline" {...props} />;
}

export function UserIcon(props: NamedIconProps) {
  return <Icon name="user" {...props} />;
}

export function WarningIcon(props: NamedIconProps) {
  return <Icon name="warning" {...props} />;
}

export function WorkspaceIcon(props: NamedIconProps) {
  return <Icon name="workspace" {...props} />;
}

export function BranchIcon(props: NamedIconProps) {
  return <Icon name="branch" {...props} />;
}

export function CalendarTimeIcon(props: NamedIconProps) {
  return <Icon name="calendar-time" {...props} />;
}

export function ClockIcon(props: NamedIconProps) {
  return <Icon name="clock" {...props} />;
}

export function ClockFastIcon(props: NamedIconProps) {
  return <Icon name="clock-fast" {...props} />;
}

export function ClusterIcon(props: NamedIconProps) {
  return <Icon name="cluster" {...props} />;
}

export function CometIcon(props: NamedIconProps) {
  return <Icon name="comet" {...props} />;
}

export function CompassIcon(props: NamedIconProps) {
  return <Icon name="compass" {...props} />;
}

export function ConstellationIcon(props: NamedIconProps) {
  return <Icon name="constellation" {...props} />;
}

export function DirectedEdgeIcon(props: NamedIconProps) {
  return <Icon name="directed-edge" {...props} />;
}

export function EclipseIcon(props: NamedIconProps) {
  return <Icon name="eclipse" {...props} />;
}

export function EdgeIcon(props: NamedIconProps) {
  return <Icon name="edge" {...props} />;
}

export function FastForwardIcon(props: NamedIconProps) {
  return <Icon name="fast-forward" {...props} />;
}

export function ForecastIcon(props: NamedIconProps) {
  return <Icon name="forecast" {...props} />;
}

export function HistoryIcon(props: NamedIconProps) {
  return <Icon name="history" {...props} />;
}

export function HourglassIcon(props: NamedIconProps) {
  return <Icon name="hourglass" {...props} />;
}

export function HubIcon(props: NamedIconProps) {
  return <Icon name="hub" {...props} />;
}

export function LayersIcon(props: NamedIconProps) {
  return <Icon name="layers" {...props} />;
}

export function MoonIcon(props: NamedIconProps) {
  return <Icon name="moon" {...props} />;
}

export function NetworkIcon(props: NamedIconProps) {
  return <Icon name="network" {...props} />;
}

export function NodeIcon(props: NamedIconProps) {
  return <Icon name="node" {...props} />;
}

export function NorthIcon(props: NamedIconProps) {
  return <Icon name="north" {...props} />;
}

export function OrbitIcon(props: NamedIconProps) {
  return <Icon name="orbit" {...props} />;
}

export function PerspectiveIcon(props: NamedIconProps) {
  return <Icon name="perspective" {...props} />;
}

export function PlanetIcon(props: NamedIconProps) {
  return <Icon name="planet" {...props} />;
}

export function RewindIcon(props: NamedIconProps) {
  return <Icon name="rewind" {...props} />;
}

export function RouteIcon(props: NamedIconProps) {
  return <Icon name="route" {...props} />;
}

export function SignalIcon(props: NamedIconProps) {
  return <Icon name="signal" {...props} />;
}

export function SunIcon(props: NamedIconProps) {
  return <Icon name="sun" {...props} />;
}

export function TelescopeIcon(props: NamedIconProps) {
  return <Icon name="telescope" {...props} />;
}

export function TimelineClockIcon(props: NamedIconProps) {
  return <Icon name="timeline-clock" {...props} />;
}

export function TimerIcon(props: NamedIconProps) {
  return <Icon name="timer" {...props} />;
}

export function TrajectoryIcon(props: NamedIconProps) {
  return <Icon name="trajectory" {...props} />;
}

export function TreeGraphIcon(props: NamedIconProps) {
  return <Icon name="tree-graph" {...props} />;
}

export function WaypointIcon(props: NamedIconProps) {
  return <Icon name="waypoint" {...props} />;
}

