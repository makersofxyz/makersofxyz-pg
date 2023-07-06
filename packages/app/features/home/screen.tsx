import {
  AchievementCard,
  Button,
  EventCard,
  FeedCard,
  H2,
  H4,
  OverviewCard,
  ScrollView,
  Separator,
  Theme,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { ArrowRight, DollarSign, Edit2, User, Users } from '@tamagui/lucide-icons'
import { useUser } from 'app/utils/useUser'
import { useVictoryTheme } from 'app/utils/useVictoryTheme'
import React from 'react'
import { useLink } from 'solito/link'
import {
  Bar,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from 'victory-native'

const defaultAuthors = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=67/32/32?ca=1',
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=30/32/32?ca=1',
  },
]

function getTimeOfDay() {
  var today = new Date()
  var curHr = today.getHours()

  if (curHr < 4) {
    return 'night'
  } else if (curHr < 12) {
    return 'morning'
  } else if (curHr < 18) {
    return 'afternoon'
  } else {
    return 'night'
  }
}

export function HomeScreen() {
  const { profile } = useUser()

  return (
    <XStack f={1}>
      <ScrollView f={3} fb={0}>
        <YStack gap="$3" pt="$4" pb="$8">
          <YStack gap="$2">
            <H2 px="$4" my="$4">
              Good {getTimeOfDay()}
              {profile?.name ? `, ${profile?.name}!` : '!'}
            </H2>
            <Separator />
          </YStack>
          <YStack gap="$10">
            <OverviewSection />
            <PostsSection />
            <AchievementsSection />
          </YStack>
        </YStack>
      </ScrollView>

      <Separator vertical />

      <ScrollView f={1} fb={0} $md={{ display: 'none' }}>
        <H4 p="$4" fontWeight="400">
          News
        </H4>
        <Separator />
        <YStack separator={<Separator />}>
          <EventCard
            title="Event #1"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
          />
          <EventCard
            title="Event #2"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
          />
          <EventCard
            title="Event #3"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
          />
          <EventCard
            title="Event #4"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            action={{
              text: 'Show Event',
              props: useLink({ href: '/' }),
            }}
          />
        </YStack>
        <Separator />
      </ScrollView>
    </XStack>
  )
}

const AchievementsSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 fontWeight="400">Achievements</H4>
        <Theme name="alt2">
          <Button size="$2" chromeless {...useLink({ href: '/' })} iconAfter={ArrowRight}>
            All Achievements
          </Button>
        </Theme>
      </XStack>

      <ScrollAdapt>
        <XStack px="$4" flexWrap="wrap" flex={1} gap="$1">
          <Theme name="purple">
            <AchievementCard
              $gtMd={{
                width: 'calc(50% - 10px)',
              }}
              $gtLg={{
                width: 'calc(25% - 10px)',
              }}
              icon={DollarSign}
              title="Make your first 100K"
              progress={{ current: 81_500, full: 100_000, label: 'dollars made' }}
              action={{
                text: 'Boost your sales',
                props: useLink({ href: '#' }),
              }}
            />
          </Theme>
          <Theme name="orange">
            <AchievementCard
              $gtMd={{
                width: 'calc(50% - 10px)',
              }}
              $gtLg={{
                width: 'calc(25% - 10px)',
              }}
              icon={User}
              title="Build your community"
              progress={{ current: 280, full: 500, label: 'members' }}
              action={{
                text: 'Boost your community',
                props: useLink({ href: '#' }),
              }}
            />
          </Theme>
          <Theme name="green">
            <AchievementCard
              $gtMd={{
                width: 'calc(50% - 10px)',
              }}
              $gtLg={{
                width: 'calc(25% - 10px)',
              }}
              icon={Edit2}
              title="Set up your profile"
              progress={{ current: 3, full: 3, label: 'steps completed' }}
              action={{
                text: 'Continue profile setup',
                props: useLink({ href: '#' }),
              }}
            />
          </Theme>
          <Theme name="blue">
            <AchievementCard
              $gtMd={{
                width: 'calc(50% - 10px)',
              }}
              $gtLg={{
                width: 'calc(25% - 10px)',
              }}
              icon={Users}
              title="Refer 5 friends"
              progress={{ current: 4, full: 5, label: 'friends referred' }}
              action={{
                text: 'Refer friends',
                props: useLink({ href: '#' }),
              }}
            />
          </Theme>
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}

const OverviewSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 fontWeight="400">Overview</H4>
        <Theme name="alt2">
          <Button size="$2" chromeless {...useLink({ href: '/' })} iconAfter={ArrowRight}>
            View All Stats
          </Button>
        </Theme>
      </XStack>

      <ScrollAdapt>
        <XStack flexWrap="wrap" ai="flex-start" jc="flex-start" px="$4" gap="$8" mb="$4">
          <OverviewCard
            $gtMd={{ minWidth: 300, flex: 1, flexBasis: 0 }}
            $md={{ width: 200 }}
            title="MRR"
            value="$18,908"
            badgeText="+0.5%"
            badgeState="success"
          />

          <OverviewCard
            $gtMd={{ minWidth: 300, flex: 1, flexBasis: 0 }}
            $md={{ width: 200 }}
            title="ARR"
            value="$204,010"
            badgeText="+40.5%"
            badgeState="success"
          />

          <OverviewCard
            $gtMd={{ minWidth: 300, flex: 1, flexBasis: 0 }}
            $md={{ width: 200 }}
            title="Today's new users"
            value="4 Users"
            badgeText="+25%"
            badgeState="success"
          />

          <OverviewCard
            $gtMd={{ minWidth: 300, flex: 1, flexBasis: 0 }}
            $md={{ width: 200 }}
            title="This week's new users"
            value="14 Users"
            badgeText="-2%"
            badgeState="failure"
          />

          <OverviewCard
            $gtMd={{ minWidth: 300, flex: 1, flexBasis: 0 }}
            $md={{ width: 200 }}
            title="Weekly Post Views"
            value="30,104"
            badgeText="-2%"
            badgeState="failure"
          />

          <OverviewCard
            $gtMd={{ minWidth: 300, flex: 1, flexBasis: 0 }}
            $md={{ width: 200 }}
            title="Monthly Post Views"
            value="150,104"
            badgeText="+1%"
            badgeState="success"
          />
        </XStack>
      </ScrollAdapt>

      <XStack>
        <RevenueChart />
        <NewMembersChart />
        <PostViewsChart />
      </XStack>
    </YStack>
  )
}

const PostsSection = () => {
  return (
    <YStack gap="$4">
      <XStack px="$4" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 fontWeight="400">Latest Posts</H4>
        <Theme name="alt2">
          <Button size="$2" chromeless {...useLink({ href: '/' })} iconAfter={ArrowRight}>
            View All Posts
          </Button>
        </Theme>
      </XStack>
      <ScrollAdapt>
        <XStack px="$4" gap="$4" mb="$4" jc="flex-start" flexWrap="wrap">
          <FeedCard
            withImages
            $md={{ width: 300 }}
            $gtMd={{ width: 'calc(33.33% - 12px)' }}
            title="Why lorem ipsum look bad"
            description="Maybe it's just me - I'll just write out some dummy text just ignore the text tyvm..."
            tag="Design"
            authors={defaultAuthors}
          />

          <FeedCard
            withImages
            $md={{ width: 300 }}
            $gtMd={{ width: 'calc(33.33% - 12px)' }}
            title="Why you should use Tamagui"
            description="Tamagui is the best way to develop performant cross-platform apps with one codebase..."
            tag="React"
            authors={defaultAuthors}
          />

          <FeedCard
            withImages
            $md={{ width: 300 }}
            $gtMd={{ width: 'calc(33.33% - 12px)' }}
            title="Merits of functional programming"
            description="What is FP anyways? let's talk about it and learn about it's pros and cons..."
            tag="Programming"
            authors={defaultAuthors}
          />

          <FeedCard
            withImages
            $md={{ width: 300 }}
            $gtMd={{ width: 'calc(33.33% - 12px)' }}
            title="Different React paradigms"
            description="We're gonna talk about different react paradigm and jargons..."
            tag="React"
            authors={defaultAuthors}
          />

          <FeedCard
            withImages
            $md={{ width: 300 }}
            $gtMd={{ width: 'calc(33.33% - 12px)' }}
            title="Another Post"
            description="Hey this is yet another post I'm putting here for demo purposes..."
            tag="React"
            authors={defaultAuthors}
          />
          <FeedCard
            withImages
            $md={{ width: 300 }}
            $gtMd={{ width: 'calc(33.33% - 12px)' }}
            title="And Another Post"
            description="I'm out of ideas for dummy posts, Sint labore sit magna ea proident aute..."
            tag="React"
            authors={defaultAuthors}
          />
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}

function ScrollAdapt({ children }: { children: React.ReactNode }) {
  const { md } = useMedia()
  return md ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <>{children}</>
  )
}

const RevenueChart = () => {
  const victoryTheme = useVictoryTheme()

  return (
    <VictoryChart theme={victoryTheme} domainPadding={{ x: 40, y: 40 }}>
      <VictoryAxis
        gridComponent={<></>}
        tickValues={[1, 2, 3]}
        tickFormat={[
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
      />
      <VictoryAxis
        style={{
          axis: {
            stroke: 'transparent',
          },
          ticks: {
            stroke: 'transparent'
          }
        }}
        dependentAxis
        gridComponent={<></>}
        tickFormat={(x) => `${x.toLocaleString()}`}
      />
      <VictoryBar
        data={[
          { x: 1, y: 10 },
          { x: 2, y: 34 },
          { x: 3, y: 40 },
        ]}
        labels={({ datum }) => `New Members: ${datum.y.toLocaleString()}`}
        labelComponent={<VictoryTooltip />}
        dataComponent={<Bar tabIndex={0} ariaLabel={({ datum }) => `x: ${datum.x}`} />}
      />
    </VictoryChart>
  )
}

const NewMembersChart = () => {
  const victoryTheme = useVictoryTheme()

  return (
    <VictoryChart theme={victoryTheme} domainPadding={{ x: 40, y: 40 }}>
      <VictoryAxis
        gridComponent={<></>}
        tickValues={[1, 2, 3]}
        tickFormat={[
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
      />
      <VictoryAxis dependentAxis gridComponent={<></>} tickFormat={(x) => `$${x / 1000}k`} />
      <VictoryBar
        data={[
          { x: 1, y: 10000 },
          { x: 2, y: 42300 },
          { x: 3, y: 24000 },
        ]}
        labels={({ datum }) => `Revenue: $${datum.y.toLocaleString()}`}
        labelComponent={<VictoryTooltip />}
        dataComponent={<Bar tabIndex={0} ariaLabel={({ datum }) => `x: ${datum.x}`} />}
      />
    </VictoryChart>
  )
}

const PostViewsChart = () => {
  const victoryTheme = useVictoryTheme()

  return (
    <VictoryChart theme={victoryTheme} domainPadding={{ x: 40, y: 40 }}>
      <VictoryAxis
        gridComponent={<></>}
        tickValues={[1, 2, 3]}
        tickFormat={[
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
      />
      <VictoryAxis dependentAxis gridComponent={<></>} tickFormat={(x) => `${x}`} />
      <VictoryStack colorScale="warm">
        <VictoryBar
          data={[
            { x: 1, y: 200 },
            { x: 2, y: 350 },
            { x: 3, y: 190 },
          ]}
          labels={({ datum }) => `Views: ${datum.y.toLocaleString()}`}
          labelComponent={<VictoryTooltip />}
          dataComponent={<Bar tabIndex={0} ariaLabel={({ datum }) => `x: ${datum.x}`} />}
        />
      </VictoryStack>
    </VictoryChart>
  )
}
