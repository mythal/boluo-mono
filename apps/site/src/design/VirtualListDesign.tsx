import { useEffect, useRef, useState } from 'react';
import type { VirtuosoHandle } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { selectRandom } from '../helper/random';
import { useVirtualListBottomLock } from '../hooks/useVirtualListBottomLock';
import { useDetectUpScroll } from '../hooks/useDetectUpScroll';

interface Item {
  name: string;
  text: string;
}
const nameList: string[] = ['DM', 'Wizard', 'Ranger'];

const fakeTextList: string[] = [
  'A jolt of electricity runs through your spinal cord as your cybernetic implants come back to life; You awaken in a pool of your own blood, bullet casings litter the floor like spilled popcorn on a movie theater.',
  "Grunting, you rise, using a nearby wall for support and leaving a hand-shaped bloodstain over a street graffiti. Everything hurts like hell but, you're still alive, glad not to become another statistic in the city's rising murder rates. A quick scan reveals that you're the only one still in the realm of the living. Your entire fucking crew is dead—flatlined by lethal injections of high-speed lead, courtesy of the finest private soldiers money can buy.",
  "There's no time to mourn. That will come later in the bottom of a bottle. Still clutching your wounds, you stumble out of that accursed alley into the neon-lit streets in search of vengeance. The first place you head to is the bar where all this began. If anyone has answers, then it must be Fat Freddy.",
  'As you stagger up the front door, the beating of the music grows louder. After one glance at you, the bouncer steps to the side, his eyes betray fear at what he sees.',
  '"Hey man," says the bartender, "you look like shit."',
  '"...What happened?"',
  '"Bullet wound," you say hoarsely.',
  'The room seems empty except for an old woman sitting alone at the end of the counter. She stares down at her drink without seeing it, looking lost in thought.',
  '"Damn!"',
  '"I don\'t know how I got here..." she whispers softly.',
  'She looks frail, almost skeletal.',
  'She nods slowly, staring off into space again.',
  '"Do you have any idea why I\'m here? Do you even care?"',
  'You shake your head.',
  '"Well, you should."',
  'You leave the bar and walk unsteadily along the sidewalks. It takes forever to get anywhere, every step bringing new pain with it.',
];

const useItemList = () => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const appendHandle = useRef<number | undefined>();
  useEffect(() => {
    const append = () => {
      setItemList((itemList) => {
        const nextList = [...itemList];
        nextList.push({ name: selectRandom(nameList), text: selectRandom(fakeTextList) });
        return nextList;
      });
      appendHandle.current = window.setTimeout(append, Math.floor(Math.random() * 1000));
    };
    appendHandle.current = window.setTimeout(append, 1000);
    return () => {
      window.clearTimeout(appendHandle.current);
    };
  }, []);
  return itemList;
};

const VirtualListDesign = () => {
  const itemList = useItemList();
  const virtualListRef = useRef<VirtuosoHandle>(null);
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null);
  const bottomLock = useVirtualListBottomLock(virtualListRef, itemList.length);
  useDetectUpScroll(scroller, bottomLock);

  return (
    <div className="h-[20rem] w-full">
      <a href="https://virtuoso.dev/">Virtuoso Documentation</a>
      <Virtuoso
        ref={virtualListRef}
        totalCount={itemList.length}
        initialTopMostItemIndex={999}
        alignToBottom
        data={itemList}
        overscan={100}
        endReached={() => (bottomLock.current = true)}
        itemContent={(index: number, item: Item) => {
          return (
            <div key={index} className="py-4 px-0 even:bg-gray-200">
              <span>{item.name}</span>: {item.text}
            </div>
          );
        }}
        scrollerRef={(ref) => {
          if (ref instanceof HTMLDivElement) {
            setScroller(ref);
          }
        }}
        followOutput="smooth"
      />
    </div>
  );
};

export default VirtualListDesign;
