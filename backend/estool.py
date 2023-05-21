#!/usr/bin/env python
import os
from elasticsearch import Elasticsearch
from dotenv import load_dotenv
import sys
"""
try:
    term=sys.argv[1]
finally:
    term="oven"
amt=sys.argv[2]
"""

amt=10_000
#print(f"{term} {amt}")

load_dotenv()

es_url_pare = os.getenv("ELASTICSEARCH_URL").split('/')[-1]
es_user = os.getenv("ELASTICSEARCH_USERNAME")
es_pswd = os.getenv("ELASTICSEARCH_PASSWORD")
es_cloud_id =  os.getenv("ELASTICSEARCH_CLOUDID")
es_api_key = os.getenv("ELASTICSEARCH_API_KEY")

"""
print(es_url_pare)
print(es_user)
print(es_pswd)
print(es_cloud_id)
"""

#print(f"[{es_url_pare}]\n[{es_cloud_id}]")



#es = Elasticsearch([f"https://{os.getenv('')"])
es = Elasticsearch(
    cloud_id = es_cloud_id,
    basic_auth=("elastic",es_pswd),
    )

#es.info()

res = es.search(index="search-mikasa", query={"match_all":{}}, size=amt)
for hit in res["hits"]["hits"]:
    # print(hit["_id"])
    print(hit["_source"])

#resp_ = es.search(index="search-mikasa", id=7150)
#print(resp_["_source"])
"""
print("Got %d Hits:" % res['hits']['total']['value'])
for hit in res['hits']['hits']:
    print(hit)

#res = 0
print(res)
"""

"""
es.search(
    index="test",
    body={"query":{"match":{"content":"kitchen"}}})
"""
