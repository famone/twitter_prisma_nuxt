<template>
    <div class="flex flex-col">
        <!-- preview card -->
        <SidebarRightPreviewCard title="Whats happening">
            <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
                <h2 class="font-bold text-gray-800 text-md dark:text-white">{{whatsHappening.title}}</h2>
                <p class="text-xs text-gray-400">{{whatsHappening.count}}</p>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
        <!-- who to follow -->
        <SidebarRightPreviewCard title="Who to follow">
            <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
                <div class="flex flex-row items-center justify-between p-2">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">

                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                            <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                        </div>
                    </div>
                    <div class="flex h-full">
                        <button
                            class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white">Follow</button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
        
    </div>
</template>

<script setup>
const whatsHappeningItems = ref([
    {
        title: 'SpaceX',
        count: '18.8k tweets'
    },
    {
        title: '#CodingIsFun',
        count: '8.8k tweets'
    },
    {
        title: '#foobal',
        count: '1.8k tweets'
    }
])

const whoToFollowItems = ref([
    {
        name: 'Vladimir Putin',
        handle: '@Putin',
        image: 'https://s.err.ee/photo/crop/2018/03/02/461055h79e2t4.jpg'
    },
    {
        name: 'Donald Trump',
        handle: '@Trump',
        image: 'https://s.err.ee/photo/crop/2021/01/23/898321h73b5t4.jpg'
    },
    {
        name: 'Joe Biden',
        handle: '@JoeBiden',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-W7mdt3lOUBDJsg7jtpScxcb9IqBRNZGl4oG6s6HzOiIXvBWaOvwBaqEizhphhdB1LA&usqp=CAU'
    }
])
</script>