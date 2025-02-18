import { DateTime } from "luxon";
import { AppStore } from "$/data/app";
import { UserStore } from "$/data/user";
import { AccountStore } from "$/data/aws";
import { StageStore } from "$/data/stage";
import { PRICING_PLAN, UsageStore } from "$/data/usage";
import { useAuth, useCurrentUser } from "$/providers/auth";
import { useStorage } from "$/providers/account";
import { useReplicache } from "$/providers/replicache";
import {
  theme,
  utility,
  Row,
  Tag,
  Text,
  Stack,
  Button,
  TextButton,
} from "$/ui";
import { Fullscreen } from "$/ui/layout";
import { Dropdown } from "$/ui/dropdown";
import {
  IconArrowPath,
  IconChevronRight,
  IconEllipsisVertical,
  IconExclamationTriangle,
} from "$/ui/icons";
import { AvatarInitialsIcon } from "$/ui/avatar-icon";
import { Syncing } from "$/ui/loader";
import { IconApp, IconArrowPathSpin } from "$/ui/icons/custom";
import type { Stage } from "@console/core/app";
import type { Account } from "@console/core/aws/account";
import { styled } from "@macaron-css/solid";
import { Link, useNavigate, useSearchParams } from "@solidjs/router";
import {
  For,
  Match,
  Show,
  Switch,
  createSignal,
  createEffect,
  createMemo,
} from "solid-js";
import { useLocalContext } from "$/providers/local";
import { filter, flatMap, groupBy, map, pipe, sortBy, toPairs } from "remeda";
import { useFlags } from "$/providers/flags";
import { User } from "@console/core/user";
import { useAppContext } from "../context";

export function Settings() {
  const app = useAppContext();

  return (
    <>
      <h1>App Settings: {app.app.name}</h1>
    </>
  );
}
