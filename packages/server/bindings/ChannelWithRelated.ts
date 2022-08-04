// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Channel } from "./Channel";
import type { Member } from "./Member";
import type { Space } from "./Space";

export interface ChannelWithRelated { channel: Channel, members: Array<Member>, space: Space, colorList: Record<string, string>, heartbeatMap: Record<string, bigint>, encodedEvents: Array<string>, }