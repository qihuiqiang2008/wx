#!/bin/bash

REPOS_GITHUB=(
bgu
buaa
)

#这里是gitlab上群组的名的id
#直接去http://gitlab.alibaba-inc.com/groups/#这里是你的群组的名称#  打开网页，然后查看源代码有一个group_id的字段，然后得到群组的id，这个在创建pro的时候需要


for (( r = 0 ; r < ${#REPOS_GITHUB[@]} ; r++ )) do


curl -XPOST http://welife001.com:9200/schools/${REPOS_GITHUB[$r]}/_mapping -d'
{
    ${REPOS_GITLAB[$r]}: {
             "_all": {
            "analyzer": "ik_max_word",
            "search_analyzer": "ik_max_word",
            "term_vector": "no",
            "store": "false"
        },
        "properties": {
            "content": {
                "type": "string",
                "store": "no",
                "term_vector": "with_positions_offsets",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_max_word",
                "include_in_all": "true",
                "boost": 8
            },
           "publish_date":{"type":"date"}
        }
    }
}'


# # 创建 repo 在 GitLab


# curl -H "Content-Type:application/json" http://gitlab.alibaba-inc.com/api/v3/projects?private_token=$token -d "{ \"name\": \"${REPOS_GITLAB[$r]}\" , \"namespace_id\": \"$NAMESPACE_GROUPS_GITLAB\" }"

# #curl -H "Content-Type:application/json" https://gitlab.company-name.fr/api/v3/projects?private_token=$token -d "{ \"name\": \"${REPOS_GITLAB[$r]}\" , \"namespace_id\": \"${NAMESPACE_GROUPS_GITLAB[$r]}\" }"


# git clone --mirror $GIT_SERVER_FROM$ORGAS_GITHUB/${REPOS_GITHUB[$r]}.git

# cd ${REPOS_GITHUB[$r]}.git

# git remote set-url origin $GIT_SERVER_TO$GROUPS_GITLAB/${REPOS_GITLAB[$r]}.git
# #git remote set-url origin git@gitlab.alibaba-inc.com:qhq/buglytics-service-release.git

# git push --mirror -u origin

# cd .. && rm -rf ${REPOS_GITHUB[$r]}.git

echo "------------------------------------done-----------------------"${REPOS_GITHUB[$r]}
done